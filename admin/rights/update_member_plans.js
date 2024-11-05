const planSelection = document.querySelector('.plan-selection'); // Ensure you have this element in your HTML

// Get all available plans
const allPlansResponse = await window.$memberstackDom.getPlans();
const allPlans = allPlansResponse.data;

// Get current member's plan connections
const memberResponse = await window.$memberstackDom.getCurrentMember();
const memberPlans = memberResponse.data;
const assignedPlans = memberPlans.planConnections.map(connection => connection.planId);

console.log("allPlans")
console.log("memberPlans")

// Clear existing options in the plan selection
planSelection.innerHTML = ''; 

// Create checkboxes for each plan
allPlans.forEach(plan => {
    // Create a label for the checkbox
    const label = document.createElement('label');
    label.textContent = plan.name; // Assuming each plan has a 'name' property

    // Create a checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = plan.id; // Assuming each plan has an 'id' property
    checkbox.name = 'plan'; // Set the name for grouping checkboxes

    // Check the checkbox if the plan is assigned
    if (assignedPlans.includes(plan.id)) {
        checkbox.checked = true;
    }

    // Append the checkbox to the label
    label.prepend(checkbox);

    // Append the label to the plan selection element
    planSelection.appendChild(label);
});


// Function to show the edit modal and populate it with member data
function showEditModal(memberItem) {
    const modal = document.getElementById('edit-member-modal');
    if (modal) {
        // Display the modal
        modal.style.display = 'block';

        // Fetch modal input elements
        const memberIdInput = document.getElementById('member-id');
        const memberCreatedInput = document.getElementById('member-created');
        const memberMailInput = document.getElementById('member-mail');
        const memberFirstNameInput = document.getElementById('member-first-name');
        const memberLastNameInput = document.getElementById('member-last-name');
        const memberPhoneInput = document.getElementById('member-phone');
        const memberOccupationInput = document.getElementById('member-occupation');
        const memberPlanSelection = document.getElementById('plan-selection');

        // Populate modal fields with member data, or display an error message in the console if a field is missing
        if (memberIdInput) {
            memberIdInput.textContent = memberItem.id || 'No ID available';
        } else {
            console.error('Element with ID "member-id" not found');
        }

        if (memberCreatedInput) {
            memberCreatedInput.textContent = memberItem.createdAt || 'No creation date available';
        } else {
            console.error('Element with ID "member-created" not found');
        }

        if (memberMailInput) {
            memberMailInput.textContent = memberItem.auth.email || 'No email available';
        } else {
            console.error('Element with ID "member-mail" not found');
        }

        if (memberFirstNameInput) {
            memberFirstNameInput.textContent = memberItem.customFields['first-name'] || 'No first name available';
        } else {
            console.error('Element with ID "member-first-name" not found');
        }

        if (memberLastNameInput) {
            memberLastNameInput.textContent = memberItem.customFields['last-name'] || 'No last name available';
        } else {
            console.error('Element with ID "member-last-name" not found');
        }

        if (memberPhoneInput) {
            memberPhoneInput.textContent = memberItem.customFields.phone || 'No phone number available';
        } else {
            console.error('Element with ID "member-phone" not found');
        }

        if (memberOccupationInput) {
            memberOccupationInput.textContent = memberItem.customFields.occupation || 'No occupation available';
        } else {
            console.error('Element with ID "member-occupation" not found');
        }

    } else {
        console.error('Edit modal with ID "edit-member-modal" not found');
    }
}