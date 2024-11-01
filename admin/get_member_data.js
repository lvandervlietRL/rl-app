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
    table.id = 'members-data-table';
    const headerRow = document.createElement('tr');
    ['ID', 'Email', 'Created At', 'Plans', 'First Name', 'Last Name', 'Phone', 'Occupation'].forEach(headerText => {
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

        // Plan cell
        const planConnectionsCell = document.createElement('td');
        planConnectionsCell.textContent = member.planConnections 
            ? member.planConnections.map(connection => connection.planName).join(', ') 
            : 'N/A';
        row.appendChild(planConnectionsCell);

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

// Function to filter table based on search input
function filterTable() {
    const filter = document.getElementById('search-input').value.toLowerCase();
    const table = document.getElementById('members-data-table');
    const rows = table.getElementsByTagName('tr');

    // Loop through all table rows (skipping the header row)
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let rowContainsFilter = Array.from(row.cells).some(cell =>
            cell.textContent.toLowerCase().includes(filter)
        );
        
        // Show or hide the row based on the search
        row.style.display = rowContainsFilter ? '' : 'none';
    }
}

// Trigger fetch on button click and add search functionality
document.addEventListener('DOMContentLoaded', () => {
    const getMembersButton = document.querySelector('.get-members-button');
    const searchInput = document.getElementById('search-input');

    if (getMembersButton) {
        getMembersButton.addEventListener('click', fetchMemberData);
    } else {
        showFailureModal('Button with class "get-members-button" not found.');
        hideLoadingOverlay();
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', filterTable); // Add search filtering
    }
});