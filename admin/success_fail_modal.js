// Create a global success modal element
const successModal = document.createElement('div');
successModal.id = 'success-modal';
successModal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <p>Je wijzigingen zijn succesvol opgeslagen!</p>
    </div>
`;
document.body.appendChild(successModal);

// Create a global failure modal element
const failureModal = document.createElement('div');
failureModal.id = 'failure-modal';
failureModal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <p>Er is een fout opgetreden. Probeer het opnieuw.</p>
    </div>
`;
document.body.appendChild(failureModal);

// Function to show the success modal
function showSuccessModal() {
    successModal.style.display = 'block';
}

// Function to show the failure modal
function showFailureModal() {
    failureModal.style.display = 'block';
}

// Function to close modals and store active tab state
function closeModal(modal) {
    modal.style.display = 'none';

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

// Event listeners for closing each modal
const closeSuccessButton = successModal.querySelector('.close-button');
closeSuccessButton.addEventListener('click', () => closeModal(successModal));

const closeFailureButton = failureModal.querySelector('.close-button');
closeFailureButton.addEventListener('click', () => closeModal(failureModal));

// Event listeners to close modals when clicking outside of them
window.addEventListener('click', (event) => {
    if (event.target === successModal) {
        closeModal(successModal);
    } else if (event.target === failureModal) {
        closeModal(failureModal);
    }
});

// Export functions to make them accessible globally
window.showSuccessModal = showSuccessModal;
window.showFailureModal = showFailureModal;
window.closeModal = closeModal;