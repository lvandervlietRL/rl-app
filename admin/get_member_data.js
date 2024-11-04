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
    ['ID', 'Email', 'Created At', 'Plans', 'First Name', 'Last Name', 'Phone', 'Occupation', 'Actions'].forEach(headerText => {
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

        // Edit button cell
        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => showEditModal(member));
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        // Append the row to the table
        table.appendChild(row);
    });

    // Clear any existing content and add the table to the container
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Function to show the edit modal and populate it with member data
function showEditModal(member) {
    const modal = document.getElementById('edit-member-modal');
    if (modal) {
        // Populate modal fields with member data (customize based on your modal structure)
        // document.getElementById('member-id').textContent = member.id;
        // document.getElementById('member-created').textContent = member.id;
        // document.getElementById('member-mail').value = member.auth.email;
        // document.getElementById('member-first-name').value = member.customFields['first-name'] || '';
        // document.getElementById('member-last-name').value = member.customFields['last-name'] || '';
        // document.getElementById('modal-member-phone').value = member.customFields.phone || '';
        // document.getElementById('modal-member-occupation').value = member.customFields.occupation || '';
        
        // Display the modal
        modal.style.display = 'block';

        const workspaceNameInput = document.querySelector('.workspace-name'); 
        const name = item.fieldData.name || 'No name available';

        if (workspaceNameInput) {
            workspaceNameInput.value = name; // Set the name input field's value
        } else {
            workspaceDashboardsText.textContent = 'No dashboards available'; // If no dashboards, show this message
        }

        
    } else {
        console.error('Edit modal with ID "edit-member-modal" not found');
    }
}

// Event listener to close the edit modal
document.addEventListener('DOMContentLoaded', () => {
    const closeModalButton = document.getElementById('close-member-editor');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            const modal = document.getElementById('edit-member-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.error('Button with ID "close-member-editor" not found');
    }
});

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