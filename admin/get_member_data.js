// get_members_data.js

let memberData = null;

// Function to fetch member data and populate table
function fetchMemberData() {
    showLoadingOverlay(); // Show overlay when fetch starts

    fetch('https://hook.eu2.make.com/xhmlwkil472n5249io31pk1ekddly33z', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        memberData = data;
        populateMembersTable(data.data); // Call the function to create the table
        hideLoadingOverlay(); // Hide overlay after data is displayed
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        showFailureModal(error.message); // Show failure modal if there's an error
        hideLoadingOverlay(); // Hide overlay if there's an error
    });
}

// Function to create and populate the members table
function populateMembersTable(members) {
    const tableContainer = document.querySelector('.members-table');

    if (!tableContainer) {
        console.error('Container for members table not found');
        return;
    }

    // Create the table and header row
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['ID', 'Email', 'Created At', 'First Name', 'Last Name', 'Phone', 'Occupation'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Populate table rows with member data
    members.forEach(member => {
        const row = document.createElement('tr');
        
        // ID cell
        const idCell = document.createElement('td');
        idCell.textContent = member.id;
        row.appendChild(idCell);

        // Email cell
        const emailCell = document.createElement('td');
        emailCell.textContent = member.auth.email;
        row.appendChild(emailCell);

        // Created At cell
        const createdAtCell = document.createElement('td');
        createdAtCell.textContent = new Date(member.createdAt).toLocaleDateString();
        row.appendChild(createdAtCell);

        // Custom fields cells (first name, last name, phone, occupation)
        const { 'first-name': firstName, 'last-name': lastName, phone, occupation } = member.customFields;

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = firstName || 'N/A';
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = lastName || 'N/A';
        row.appendChild(lastNameCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = phone || 'N/A';
        row.appendChild(phoneCell);

        const occupationCell = document.createElement('td');
        occupationCell.textContent = occupation || 'N/A';
        row.appendChild(occupationCell);

        // Append the row to the table
        table.appendChild(row);
    });

    // Clear any existing content and add the table to the container
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Trigger fetch on button click
document.addEventListener('DOMContentLoaded', () => {
    const getMembersButton = document.querySelector('.get-members-button');
    
    if (getMembersButton) {
        getMembersButton.addEventListener('click', fetchMemberData);
    } else {
        showFailureModal('Button with class "get-members-button" not found.');
        hideLoadingOverlay();
    }
});
