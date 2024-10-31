let memberData = null;

// Declare the global function
function fetchMemberData() {
    // Fetch data from the Make webhook
    fetch('https://hook.eu2.make.com/xhmlwkil472n5249io31pk1ekddly33z', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        console.log('Full response (first webhook):', response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Received member data:', data);
        memberData = data;
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => hideLoadingOverlay()); // Hide spinner after fetch is complete or error occurs
}

// Trigger the fetch function when 'get-members-button' is clicked
document.addEventListener('DOMContentLoaded', () => {
    const getMembersButton = document.querySelector('.get-members-button');
    
    if (getMembersButton) {
        getMembersButton.addEventListener('click', fetchMemberData);
        showLoadingOverlay();
    } else {
        const errorMessage = 'Button with class "get-members-button" not found.';
        showFailureModal(errorMessage);
        hideLoadingOverlay();
    }
});
