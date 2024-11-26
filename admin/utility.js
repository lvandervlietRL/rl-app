// utility.js
function checkElementValue(selector, errorMessage) {
    const element = document.getElementById(selector);
    if (!element || !element.value.trim()) {
        showFailureModal(errorMessage);
        hideLoadingOverlay(); // Hide loading overlay
        return null; // Indicate failure
    }
    return element.value.trim(); // Return trimmed value if valid
}