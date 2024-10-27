<script>
// get_admin_data.js

// Declare global variables
let firstWebhookData = null;
let secondWebhookData = null;

// Show and hide loading overlay
function showLoadingOverlay() {
    document.querySelector('.loading-overlay').style.display = 'flex';
}

function hideLoadingOverlay() {
    document.querySelector('.loading-overlay').style.display = 'none';
}

// Declare the global function to fetch webhooks
function fetchWebhookData() {
    // Show loading spinner
    showLoadingOverlay();
    
    // Fetch data from the first Make webhook
    fetch('https://hook.eu2.make.com/5hbungik9p14284ilulge2ahahggor7f', {
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
        console.log('Received data (first webhook):', data);
        firstWebhookData = data;

        // Now fetch data from the second Make webhook
        return fetch('https://hook.eu2.make.com/ok0bwbmkw85xgrbkhydraikw4pq5v4ut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
    })
    .then(secondResponse => {
        console.log('Full response (second webhook):', secondResponse);
        if (!secondResponse.ok) {
            throw new Error(`HTTP error! Status: ${secondResponse.status}`);
        }
        return secondResponse.json(); 
    })
    .then(secondData => {
        console.log('Received data (second webhook):', secondData);
        secondWebhookData = secondData;
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => hideLoadingOverlay()); // Hide spinner after fetch is complete or error occurs
}

// Trigger the fetch function on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWebhookData(); // Run on page load
});
</script>