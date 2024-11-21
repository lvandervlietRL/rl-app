// Declare global variables
let custimezeSiteData

// Declare the global function to fetch webhooks
function fetchCustimezeSiteData() {
    // Show loading spinner
    showLoadingOverlay();

    const payload = {
        WorkspaceId: wsCmsId,
        DashboardId: dashCmsId,
        customCmsId: customCmsId
    }
    
    // Fetch data from the first Make webhook
    fetch('https://hook.eu2.make.com/5hbungik9p14284ilulge2ahahggor7f', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('Full response (first webhook):', response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Received data (first webhook):', data);
        custimezeSiteData = data;
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => hideLoadingOverlay()); 
}

// Trigger the fetch function on page load
document.addEventListener('DOMContentLoaded', () => {
    const getMembersButton = document.querySelector('.get-site-button');
    fetchCustimezeSiteData();
});