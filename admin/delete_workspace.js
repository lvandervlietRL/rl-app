<script>
// delete_workspace.js
document.addEventListener('DOMContentLoaded', () => {
    // Create a modal for success notification
    const successModal = document.createElement('div');
    successModal.id = 'success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>Workspace verwijderd!</p>
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

    // Select the button with class 'delete-workspace-button'
    const button = document.querySelector('.delete-workspace-button'); 

    if (button) {
        button.addEventListener('click', function () {

            if (!firstWebhookData) {
                console.error('First webhook data not available.');
                return;
            }

            const matchingItemIndex = firstWebhookData.items.findIndex(item => item.fieldData.name === buttonName);

            if (matchingItemIndex === -1) {
                console.error(`No matching item found for button name: ${buttonName}`);
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
        console.error('Button with class "delete-workspace-button" not found.');
    }
});
</script>