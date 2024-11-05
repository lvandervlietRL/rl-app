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