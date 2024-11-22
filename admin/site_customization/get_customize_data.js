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

// Function to show the edit modal and populate it with site data
function showEditModal(memberItem) {
    try {
        const modal = document.getElementById('customize-site-modal');
        if (!modal) throw new Error('Edit modal not found.');

        // Display the modal
        modal.style.display = 'block';

        // Specify customization elements
        const elementIds = [
            'customize-hero-title',
            'customize-hero-subtitle',
            'customize-accent-color',
            'customize-hero-image',
            'customize-logo',
            'customize-street',
            'customize-house-number',
            'customize-postcode',
            'customize-city',
            'customize-support-phone',
            'customize-support-mail',
            'customize-facebook',
            'customize-linkedin',
            'customize-github',
            'customize-instagram',
            'customize-youtube',
            'customize-whatsapp',
            'customize-twitter',
            'customize-snapchat',
            'customize-tiktok',
        ];

        // Helper function to populate input fields
        const populateInput = (id) => {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`Element with ID '${id}' not found.`);
                return;
            } 

            const inputElement = document.getElementById(`.${id}-input`);
            if (inputElement) {
                inputElement.value = element.textContent || element.innerText || '';
            } else {
                console.warn(`Input element with class '${id}-input' not found.`);
            }
        };

        // Populate input fields for all element IDs
        elementIds.forEach(populateInput);
    } catch (error) {
        console.error('Error showing edit modal:', error.message);
    }
}

        // // Fetch modal input elements
        // const elements = {};
        // elementIds.forEach(id => {
        //     elements[id] = document.getElementById(id);
        // });

        // const heroTitleInput = document.querySelector('.customize-hero-title-input');

        // if (heroTitleInput) {
        //     heroTitleInput.value = customizeHeroTitle ;
        // }
        
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-site-button');

    if (editButton) {
        editButton.addEventListener('click', () => {
            // Assuming `memberItem` is already defined or fetched elsewhere
            const memberItem = null; // Replace with the actual data if necessary
            showEditModal(memberItem);
        });
    } else {
        console.warn('Edit site button not found.');
    }
});


// customize-hero-title-input
// customize-hero-subtitle-input
// customize-accent-color-input
// customize-hero-image-input
// customize-logo-input
// customize-street-input
// customize-house-number-input
// customize-postcode-input
// customize-city-input
// customize-support-phone-input
// customize-support-mail-input
// customize-facebook-input
// customize-linkedin-input
// customize-github-input
// customize-instagram-input
// customize-youtube-input
// customize-whatsapp-input
// customize-twitter-input
// customize-snapchat-input
// customize-tiktok-input

document.addEventListener('DOMContentLoaded', () => {
    // Ensure utility.js is loaded and accessible
    const button = document.querySelector('.site-customize-save-button'); 

    if (button) {
        button.addEventListener('click', function () {
            // Show loading overlay
            showLoadingOverlay();

            // Use checkElementValue from utility.js
            // Check required values
            const heroTitle = checkElementValue('.customize-hero-title-input', 'Error: Hero title cannot be empty.');
            if (heroTitle === null) return;

            const heroSubtitle = checkElementValue('.customize-hero-subtitle-input', 'Error: Hero subtitle cannot be empty.');
            if (heroSubtitle === null) return;

            const accentColor = checkElementValue('.customize-accent-color-input', 'Error: Hero subtitle cannot be empty.');
            if (accentColor === null) return;

            const heroImage = checkElementValue('.customize-hero-image-input', 'Error: Hero image cannot be empty.');
            if (heroImage === null) return;

            const logo = checkElementValue('.customize-logo-input', 'Error: Logo cannot be empty.');
            if (logo === null) return;

            const street = checkElementValue('.customize-street-input', 'Error: Street cannot be empty.');
            if (street === null) return;

            const houseNumber = checkElementValue('.customize-house-number-input', 'Error: House number cannot be empty.');
            if (houseNumber === null) return;

            const postcode = checkElementValue('.customize-postcode-input', 'Error: Postcode cannot be empty.');
            if (postcode === null) return;

            const city = checkElementValue('.customize-city-input', 'Error: City cannot be empty.');
            if (city === null) return;

            const supportPhone = checkElementValue('.customize-support-phone-input', 'Error: Support phone cannot be empty.');
            if (supportPhone === null) return;

            const supportMail = checkElementValue('.customize-support-mail-input', 'Error: Support mail cannot be empty.');
            if (supportMail === null) return;

            // Optional social media inputs
            const facebook = checkElementValue('.customize-facebook-input', null);
            const linkedin = checkElementValue('.customize-linkedin-input', null);
            const github = checkElementValue('.customize-github-input', null);
            const instagram = checkElementValue('.customize-instagram-input', null);
            const youtube = checkElementValue('.customize-youtube-input', null);
            const whatsapp = checkElementValue('.customize-whatsapp-input', null);
            const twitter = checkElementValue('.customize-twitter-input', null);
            const snapchat = checkElementValue('.customize-snapchat-input', null);
            const tiktok = checkElementValue('.customize-tiktok-input', null);

            const payload = {
                "workspaceId": wsCmsId,
                "dashboardId": dashCmsId,
                "customCmsId": customCmsId,
                "isArchived": false,
                "isDraft": false,
                "fieldData": {
                  "hero-title": heroTitle,
                  "hero-subtitle": heroSubtitle,
                  "accent-color": accentColor,
                //   "hero-image": {
                //     "fileId": "673ba07b25b6b406eb4f2f6f",
                //     "url": "https://cdn.prod.website-files.com/67366701db27b907faa64aed/673ba07b25b6b406eb4f2f6f_openart-image_sE0J2BuW_1731849297830_raw.jpg",
                //     "alt": null
                //   },
                //   "logo": {
                //     "fileId": "673eea2a55ca82dae0599734",
                //     "url": "https://cdn.prod.website-files.com/67366701db27b907faa64aed/673eea2a55ca82dae0599734_3.png",
                //     "alt": null
                //   },
                  "support-mail": supportMail,
                  "support-phone": supportPhone,
                  "instagram": instagram,
                  "linkedin": linkedin,
                  "city": city,
                  "house-number": houseNumber,
                  "postcode": postcode,
                  "street": street,
                  "facebook": facebook,
                  "whatsapp": whatsapp,
                  "youtube": youtube,
                  "github": github,
                  "snapchat": snapchat,
                  "tiktok": tiktok,
                  "twitter": twitter
                }
              }

            fetch('https://hook.eu2.make.com/4q7mtan5fejlhtifi8ndx2qm4nby75u9', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    const errorMessage = `HTTP error! Status: ${response.status}`;
                    showFailureModal(errorMessage);
                    hideLoadingOverlay();
                    throw new Error(errorMessage);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from webhook:', data);
                showSuccessModal(); 
                hideLoadingOverlay();
            })
            .catch(error => {
                const errorMessage = `Error sending data to the webhook: ${error}`;
                showFailureModal(errorMessage);
                hideLoadingOverlay();
            });
        });
    } else {
        const errorMessage = 'Button with class "site-customize-save-button" not found.';
        showFailureModal(errorMessage);
        hideLoadingOverlay();
    }
}); 