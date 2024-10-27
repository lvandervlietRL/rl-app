// patch_workspace.js
document.addEventListener('DOMContentLoaded', () => {
    // Select the button with class 'workspace-save-button'
    const button = document.querySelector('.workspace-save-button'); 

    if (button) {
        button.addEventListener('click', function () {
            // Show loading overlay
            showLoadingOverlay();

            if (!firstWebhookData) {
                const errorMessage = 'First webhook data not available.';
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const matchingItemIndex = firstWebhookData.items.findIndex(item => item.fieldData.name === buttonName);

            if (matchingItemIndex === -1) {
                const errorMessage = `No matching item found for button name: ${buttonName}`;
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const itemId = firstWebhookData.items[matchingItemIndex].id;

            const workspaceNameElement = document.querySelector('.workspace-name');
            if (!workspaceNameElement) {
                const errorMessage = 'Error: Workspace name element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceName = workspaceNameElement.value.trim();

            const workspaceSlugElement = document.querySelector('.workspace-slug');
            if (!workspaceSlugElement) {
                const errorMessage = 'Error: Workspace slug element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceSlug = workspaceSlugElement.value.trim();

            const workspaceDescriptionElement = document.querySelector('.workspace-description');
            if (!workspaceDescriptionElement) {
                const errorMessage = 'Error: Workspace description element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceDescription = workspaceDescriptionElement.value.trim();

            const workspaceRoleElement = document.querySelector('.workspace-role');
            if (!workspaceRoleElement) {
                const errorMessage = 'Error: Workspace role element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceRole = workspaceRoleElement.value.trim();

            const dashboardTableRows = document.querySelectorAll('.admin-table tr');
            const dashboards = [];
            dashboardTableRows.forEach((row, index) => {
                if (index === 0) return;
                const idCell = row.querySelector('td:first-child');
                if (idCell) {
                    dashboards.push(idCell.textContent.trim());
                }
            });

            const payload = {
                id: itemId,
                isArchived: false,
                isDraft: false,
                fieldData: {
                    name: workspaceName, 
                    slug: workspaceSlug, 
                    "workspace-omschrijving": workspaceDescription, 
                    rol: workspaceRole,
                    dashboards: dashboards
                }
            };

            fetch('https://hook.eu2.make.com/e83jdmhxtvhk5hhlpw1e7vx3nogbtvw8', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    const errorMessage = `HTTP error! Status: ${response.status}`;
                    showFailureModal(errorMessage);
                    hideLoadingOverlay();
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from webhook:', data);
                showSuccessModal(); // Show global success modal
                hideLoadingOverlay(); // Hide loading overlay
            })
            .catch(error => {
                const errorMessage = `Error sending data to the webhook: ${error}`;
                showFailureModal(errorMessage);
                hideLoadingOverlay(); // Hide loading overlay on error
            });
        });
    } else {
        console.error('Button with class "workspace-save-button" not found.');
        showFailureModal(errorMessage);
        hideLoadingOverlay();
    }
});