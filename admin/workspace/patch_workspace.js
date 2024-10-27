// patch_workspace.js
document.addEventListener('DOMContentLoaded', () => {
    // Create a modal for success notification
    const successModal = document.createElement('div');
    successModal.id = 'success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>Je wijzigingen zijn succesvol opgeslagen!</p>
        </div>
    `;
    document.body.appendChild(successModal);

    // Function to show the modal
    function showModal() {
        successModal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        successModal.style.display = 'none';

        // Store the active tab value in sessionStorage
        const activeTab = document.querySelector('.w-tab-pane.w--tab-active');
        if (activeTab) {
            const activeTabLink = document.querySelector(`.dash_profile-nav-link[aria-controls="${activeTab.id}"]`);
            if (activeTabLink) {
                const activeTabValue = activeTabLink.getAttribute('data-w-tab'); // Get the value of data-w-tab
                sessionStorage.setItem('activeTab', activeTabValue);
            }
        }

        // Reload the page
        location.reload();
    }

    // Event listener for closing the modal
    const closeButton = successModal.querySelector('.close-button');
    closeButton.addEventListener('click', closeModal);

    // Event listener to close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });

    // Select the button with class 'workspace-save-button'
    const button = document.querySelector('.workspace-save-button'); 

    if (button) {
        button.addEventListener('click', function () {
            // Show loading overlay
            showLoadingOverlay();

            if (!firstWebhookData) {
                console.error('First webhook data not available.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const matchingItemIndex = firstWebhookData.items.findIndex(item => item.fieldData.name === buttonName);

            if (matchingItemIndex === -1) {
                console.error(`No matching item found for button name: ${buttonName}`);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const itemId = firstWebhookData.items[matchingItemIndex].id;

            const workspaceNameElement = document.querySelector('.workspace-name');
            if (!workspaceNameElement) {
                console.error('Error: Workspace name element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceName = workspaceNameElement.value.trim();

            const workspaceSlugElement = document.querySelector('.workspace-slug');
            if (!workspaceSlugElement) {
                console.error('Error: Workspace slug element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceSlug = workspaceSlugElement.value.trim();

            const workspaceDescriptionElement = document.querySelector('.workspace-description');
            if (!workspaceDescriptionElement) {
                console.error('Error: Workspace description element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const workspaceDescription = workspaceDescriptionElement.value.trim();

            const workspaceRoleElement = document.querySelector('.workspace-role');
            if (!workspaceRoleElement) {
                console.error('Error: Workspace role element not found.');
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
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from webhook:', data);
                showModal(); // Show success modal
                hideLoadingOverlay(); // Hide loading overlay
            })
            .catch(error => {
                console.error('Error sending data to the webhook:', error);
                hideLoadingOverlay(); // Hide loading overlay on error
            });
        });
    } else {
        console.error('Button with class "workspace-save-button" not found.');
    }
});