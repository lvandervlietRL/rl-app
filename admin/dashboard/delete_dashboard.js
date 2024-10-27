// delete_dashboards.js
document.addEventListener('DOMContentLoaded', () => {
    // Create a modal for success notification
    const successModal = document.createElement('div');
    successModal.id = 'success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>Dashboard verwijderd!</p>
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
        // Trigger both webhooks when the modal is closed
        fetchWebhookData();
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
                showModal(); // Show success modal
            })
            .catch(error => {
                console.error('Error sending data to the webhook:', error);
            });
        });
    } else {
        console.error('Button with class "delete-dash-button" not found.');
    }
});