// delete_workspace.js
document.addEventListener('DOMContentLoaded', () => {
    // Select the button with class 'delete-workspace-button'
    const button = document.querySelector('.delete-workspace-button'); 

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

            const payload = {
                id: itemId,
            };

            fetch('https://hook.eu2.make.com/y60y6hrofoh6yg3uyagl2banxem72b99', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    hideLoadingOverlay(); // Hide loading overlay
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
        console.error('Button with class "delete-workspace-button" not found.');
    }
});