// Create a global modal element
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

// Function to close the modal and store active tab state
function closeModal() {
    successModal.style.display = 'none';

    // Store the active tab value in sessionStorage
    const activeTab = document.querySelector('.w-tab-pane.w--tab-active');
    if (activeTab) {
        const activeTabLink = document.querySelector(`.dash_profile-nav-link[aria-controls="${activeTab.id}"]`);
        if (activeTabLink) {
            const activeTabValue = activeTabLink.getAttribute('data-w-tab');
            sessionStorage.setItem('activeTab', activeTabValue);
        }
    }

    // Reload the page
    location.reload();
}

// Event listener for closing the modal
const closeButton = successModal.querySelector('.close-button');
closeButton.addEventListener('click', closeModal);

// Event listener to close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === successModal) {
        closeModal();
    }
});

// Export showModal and closeModal functions to make them accessible globally
window.showModal = showModal;
window.closeModal = closeModal;