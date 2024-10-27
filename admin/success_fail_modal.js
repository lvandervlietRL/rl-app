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

// Create a global failure modal element with a placeholder for the error message
const failureModal = document.createElement('div');
failureModal.id = 'failure-modal';
failureModal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <p>Er is een fout opgetreden. Probeer het opnieuw.</p>
        <p id="error-message" style="color: red; font-weight: bold;"></p> <!-- Placeholder for dynamic error message -->
    </div>
`;
document.body.appendChild(failureModal);

// Function to show the success modal
function showSuccessModal() {
    successModal.style.display = 'block';
}

// Function to show the failure modal with a specific error message
function showFailureModal(errorMessage = '') {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = errorMessage; // Set the error message
    failureModal.style.display = 'block';
}

// Function to close the success modal and store active tab state
function closeSuccessModal() {
    successModal.style.display = 'none';

    // Store the active tab value in sessionStorage only if the operation was successful
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

// Function to close the failure modal
function closeFailureModal() {
    failureModal.style.display = 'none';
}

// Event listeners for closing each modal
const closeSuccessButton = successModal.querySelector('.close-button');
closeSuccessButton.addEventListener('click', closeSuccessModal);

const closeFailureButton = failureModal.querySelector('.close-button');
closeFailureButton.addEventListener('click', closeFailureModal);

// Event listener to close modals when clicking outside of them
window.addEventListener('click', (event) => {
    if (event.target === successModal) {
        closeSuccessModal();
    } else if (event.target === failureModal) {
        closeFailureModal();
    }
});

// Load the initial tab state on page load
window.addEventListener('load', () => {
    // Show the first tab by default (with data-w-tab="Overzicht")
    const firstTab = document.querySelector('.dash_profile-nav-link[data-w-tab="Overzicht"]');
    if (firstTab) {
        firstTab.classList.add('w--current'); // Mark as active
        const firstTabPaneId = firstTab.getAttribute('aria-controls');
        const firstTabPane = document.getElementById(firstTabPaneId);
        if (firstTabPane) {
            firstTabPane.classList.add('w--tab-active'); // Show the corresponding pane
        }
    }
});

// Export functions to make them accessible globally
window.showSuccessModal = showSuccessModal;
window.showFailureModal = showFailureModal;
window.closeSuccessModal = closeSuccessModal; // Corrected function name
window.closeFailureModal = closeFailureModal; // Corrected function name