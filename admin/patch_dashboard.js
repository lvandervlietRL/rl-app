<script>
// patch_dashboard.js
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

    // Select the button with class 'dash-save-button'
    const button = document.querySelector('.dash-save-button'); 

    if (button) {
        button.addEventListener('click', function () {
            // Show loading overlay
            showLoadingOverlay();

            if (!secondWebhookData) {
                console.error('Second webhook data not available.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const matchingItemIndex = secondWebhookData.findIndex(item => item.fieldData.name === dashButtonName);

            if (matchingItemIndex === -1) {
                console.error(`No matching item found for button name: ${dashButtonName}`);
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }

            const itemId = secondWebhookData[matchingItemIndex].id;

            const dashboardNameElement = document.querySelector('.dashboard-name');
            if (!dashboardNameElement) {
                console.error('Error: Dashboard name element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const dashboardName = dashboardNameElement.value.trim();

            const dashboardSlugElement = document.querySelector('.dashboard-slug');
            if (!dashboardSlugElement) {
                console.error('Error: Dashboard slug element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const dashboardSlug = dashboardSlugElement.value.trim();

            const dashboardDescriptionElement = document.querySelector('.dashboard-description');
            if (!dashboardDescriptionElement) {
                console.error('Error: Dashboard description element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const dashboardDescription = dashboardDescriptionElement.value.trim();

            const dashboardLinkElement = document.querySelector('.dashboard-link');
            if (!dashboardLinkElement) {
                console.error('Error: Dashboard link element not found.');
                hideLoadingOverlay(); // Hide loading overlay
                return;
            }
            const dashboardLink = dashboardLinkElement.value.trim();

            const payload = {
                id: itemId,
                isArchived: false,
                isDraft: false,
                fieldData: {
                    name: dashboardName, 
                    slug: dashboardSlug, 
                    "dashboard-omschrijving": dashboardDescription, 
                    "public-link": dashboardLink
                }
            };

            fetch('https://hook.eu2.make.com/vspuucb441pisya32cz3ij7h5fxtcwl6', {
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
    }
});
</script>