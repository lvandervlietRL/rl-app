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

// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started
var colorPicker = new iro.ColorPicker(".ms-colorpicker", {
    // color picker options
    // Option guide: https://iro.js.org/guide.html#color-picker-options
    width: 180,
    color: "rgb(255, 0, 0)",
    borderWidth: 5,
    borderColor: "#f5f5f5",
});    
var values = document.getElementById("values");
var hexInput = document.getElementById("hexInput");
var swatch = document.getElementById("colorSwatch");    // https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["color:init", "color:change"], function(color){
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    values.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
    ].join("<br>");
    
    hexInput.value = color.hexString;
    swatch.style.backgroundColor = color.hexString;
});    hexInput.addEventListener('change', function() {
    colorPicker.color.hexString = this.value;
    swatch.style.backgroundColor = this.value;
});

// Function to show the edit modal and populate it with site data
function showEditModal() {
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

            // Check for an input element by ID
            const inputElementById = document.getElementById(`${id}-input`);
            if (inputElementById) {
                inputElementById.value = element.textContent || element.innerText || '';
                return; // Exit since we found the input by ID
            }
        };

        // Populate input fields for all element IDs
        elementIds.forEach(populateInput);
    } catch (error) {
        console.error('Error showing edit modal:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-site-button');

    if (editButton) {
        editButton.addEventListener('click', () => {
            showEditModal();
        });
    } else {
        console.warn('Edit site button not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const closeModalButton = document.getElementById('close-customize-editor');

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            const modal = document.getElementById('customize-site-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.error('Button with ID "close-customize-editor" not found');
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

            // Use checkElementValueById from utility.js
            // Check required values
            const heroTitle = checkElementValueById('customize-hero-title-input', 'Error: Hero title cannot be empty.');
            if (heroTitle === null) return;

            const heroSubtitle = checkElementValueById('customize-hero-subtitle-input', 'Error: Hero subtitle cannot be empty.');
            if (heroSubtitle === null) return;

            const accentColor = checkElementValue('.customize-accent-color-input', 'Error: Hero subtitle cannot be empty.');
            if (accentColor === null) return;

            // const heroImage = checkElementValueById('customize-hero-image-input', 'Error: Hero image cannot be empty.');
            // if (heroImage === null) return;

            // const logo = checkElementValueById('customize-logo-input', 'Error: Logo cannot be empty.');
            // if (logo === null) return;

            const street = checkElementValueById('customize-street-input', 'Error: Street cannot be empty.');
            if (street === null) return;

            const houseNumber = checkElementValueById('customize-house-number-input', 'Error: House number cannot be empty.');
            if (houseNumber === null) return;

            const postcode = checkElementValueById('customize-postcode-input', 'Error: Postcode cannot be empty.');
            if (postcode === null) return;

            const city = checkElementValueById('customize-city-input', 'Error: City cannot be empty.');
            if (city === null) return;

            const supportPhone = checkElementValueById('customize-support-phone-input', 'Error: Support phone cannot be empty.');
            if (supportPhone === null) return;

            const supportMail = checkElementValueById('customize-support-mail-input', 'Error: Support mail cannot be empty.');
            if (supportMail === null) return;

            // Optional social media inputs
            const facebook = checkElementValueById('customize-facebook-input', null);
            const linkedin = checkElementValueById('customize-linkedin-input', null);
            const github = checkElementValueById('customize-github-input', null);
            const instagram = checkElementValueById('customize-instagram-input', null);
            const youtube = checkElementValueById('customize-youtube-input', null);
            const whatsapp = checkElementValueById('customize-whatsapp-input', null);
            const twitter = checkElementValueById('customize-twitter-input', null);
            const snapchat = checkElementValueById('customize-snapchat-input', null);
            const tiktok = checkElementValueById('customize-tiktok-input', null);

            const payload = {
                workspaceId: wsCmsId,
                dashboardId: dashCmsId,
                customCmsId: customCmsId,
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

            console.log(payload)

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