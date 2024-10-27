// patch_workspace.js
document.addEventListener('DOMContentLoaded', () => {
    // Select the button with class 'workspace-save-button'
    const button = document.querySelector('.workspace-save-button'); 

    if (button) {
        button.addEventListener('click', function () {
            // Show loading overlay
            showLoadingOverlay();

            if (!firstWebhookData) {
                showFailureModal('First webhook data not available.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const matchingItemIndex = firstWebhookData.items.findIndex(item => item.fieldData.name === buttonName);

            if (matchingItemIndex === -1) {
                showFailureModal(`No matching item found for button name: ${buttonName}`);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const itemId = firstWebhookData.items[matchingItemIndex].id;

            // Utility function to check element existence and value
            const checkElementValue = (selector, errorMessage) => {
                const element = document.querySelector(selector);
                if (!element || !element.value.trim()) {
                    showFailureModal(errorMessage);
                    hideLoadingOverlay(); // Hide loading overlay
                    return null; // Indicate failure
                }
                return element.value.trim(); // Return trimmed value if valid
            };

            // Check values for each required field
            const workspaceName = checkElementValue('.workspace-name', 'Error: Workspace name cannot be empty.');
            if (workspaceName === null) return; // Exit if check failed

            const workspaceSlug = checkElementValue('.workspace-slug', 'Error: Workspace slug cannot be empty.');
            if (workspaceSlug === null) return; // Exit if check failed

            const workspaceDescription = checkElementValue('.workspace-description', 'Error: Workspace description cannot be empty.');
            if (workspaceDescription === null) return; // Exit if check failed

            const workspaceRole = checkElementValue('.workspace-role', 'Error: Workspace role cannot be empty.');
            if (workspaceRole === null) return; // Exit if check failed

            const dashboardTableRows = document.querySelectorAll('.admin-table tr');
            const dashboards = [];
            dashboardTableRows.forEach((row, index) => {
                if (index === 0) return; // Skip header row
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
                    const errorMessage = `HTTP error! Status: ${response.status}`;
                    showFailureModal(errorMessage);
                    hideLoadingOverlay(); // Hide loading overlay
                    throw new Error(errorMessage); // Throw error to be caught in catch block
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
        showFailureModal('Button with class "workspace-save-button" not found.');
        hideLoadingOverlay();
    }
});