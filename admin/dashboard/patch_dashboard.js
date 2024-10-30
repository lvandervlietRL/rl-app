// patch_dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Select the button with class 'dash-save-button'
    const button = document.querySelector('.dash-save-button'); 

    if (button) {
        button.addEventListener('click', function () {
            // Show loading overlay
            showLoadingOverlay();

            if (!secondWebhookData) {
                const errorMessage = 'Second webhook data not available.';
                showFailureModal(errorMessage);
                hideLoadingOverlay();
                return;
            }

            const matchingItemIndex = secondWebhookData.findIndex(item => item.fieldData.name === dashButtonName);

            if (matchingItemIndex === -1) {
                const errorMessage = `No matching item found for button name: ${dashButtonName}`;
                showFailureModal(errorMessage);
                hideLoadingOverlay();
                return;
            }

            const itemId = secondWebhookData[matchingItemIndex].id;

            const dashboardNameElement = document.querySelector('.dashboard-name');
            if (!dashboardNameElement) {
                const errorMessage = 'Error: Dashboard name element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay();
                return;
            }
            const dashboardName = dashboardNameElement.value.trim();

            const dashboardSlugElement = document.querySelector('.dashboard-slug');
            if (!dashboardSlugElement) {
                const errorMessage = 'Error: Dashboard slug element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay();
                return;
            }
            const dashboardSlug = dashboardSlugElement.value.trim();

            const dashboardDescriptionElement = document.querySelector('.dashboard-description');
            if (!dashboardDescriptionElement) {
                const errorMessage = 'Error: Dashboard description element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay();
                return;
            }
            const dashboardDescription = dashboardDescriptionElement.value.trim();

            const dashboardLinkElement = document.querySelector('.dashboard-link');
            if (!dashboardLinkElement) {
                const errorMessage = 'Error: Dashboard link element not found.';
                showFailureModal(errorMessage);
                hideLoadingOverlay();
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
                    const errorMessage = `HTTP error! Status: ${response.status}`;
                    showFailureModal(errorMessage);
                    hideLoadingOverlay();
                    throw new Error(errorMessage);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from webhook:', data);
                showSuccessModal(); // Show success modal
                hideLoadingOverlay();
            })
            .catch(error => {
                const errorMessage = `Error sending data to the webhook: ${error}`;
                showFailureModal(errorMessage);
                hideLoadingOverlay();
            });
        });
    }
});