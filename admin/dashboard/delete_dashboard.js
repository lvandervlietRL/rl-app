// delete_dashboards.js
document.addEventListener('DOMContentLoaded', () => {
    // Select the button with class 'delete-dash-button'
    const button = document.querySelector('.delete-dash-button'); 

    if (button) {
        button.addEventListener('click', function () {

            if (!secondWebhookData) {
                console.error('Second webhook data not available.');
                return;
            }

            const matchingItemIndex = secondWebhookData.findIndex(item => item.fieldData.name === dashButtonName);

            if (matchingItemIndex === -1) {
                console.error(`No matching item found for button name: ${dashButtonName}`);
                return;
            }

            const itemId = secondWebhookData[matchingItemIndex].id;

            const payload = {
                id: itemId,
            };

            fetch('https://hook.eu2.make.com/fwajh95bt36d6ic5wesmyoowka4mw3ex', {
                method: 'DELETE',
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
                showSuccessModal(); // Show success modal
            })
            .catch(error => {
                console.error('Error sending data to the webhook:', error);
            });
        });
    } else {
        console.error('Button with class "delete-dash-button" not found.');
    }
});