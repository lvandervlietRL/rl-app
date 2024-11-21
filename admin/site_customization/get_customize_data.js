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
    fetch('https://hook.eu2.make.com/4q7mtan5fejlhtifi8ndx2qm4nby75u9', {
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

// customize-name
// customize-hero-title
// customize-hero-subtitle
// customize-hero-image
// customize-logo
// customize-street
// customize-house-number
// customize-postcode
// customize-city
// customize-support-phone
// customize-support-mail
// customize-facebook
// customize-linkedin
// customize-github
// customize-instagram
// customize-youtube
// customize-whatsapp
// customize-twitter
// customize-snapchat
// customize-tiktok