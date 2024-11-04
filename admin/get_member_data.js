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
        editButton.setAttribute('data-id', member.id); // Set data-id attribute with member.id
        editButton.addEventListener('click', () => {
            const memberId = editButton.getAttribute('data-id');
            const memberItem = memberData.data.find(item => item.id === memberId);
            if (memberItem) {
                showEditModal(memberItem); // Pass the found member to the modal function
            } else {
                console.error('Member data not found for ID:', memberId);
            }
        });
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

// Event listener to close the edit modal and trigger fetch on button click
document.addEventListener('DOMContentLoaded', () => {
    const closeModalButton = document.getElementById('close-member-editor');
    const getMembersButton = document.querySelector('.get-members-button');
    const searchInput = document.getElementById('search-input');

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

    if (getMembersButton) {
        getMembersButton.addEventListener('click', fetchMemberData);
    } else {
        console.error('Button with class "get-members-button" not found');
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterTable);
    } else {
        console.error('Search input with ID "search-input" not found');
    }
});

// Function to filter the members table based on input
function filterTable() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const table = document.getElementById('members-data-table');
    const rows = table.querySelectorAll('tr:not(:first-child)'); // Exclude header row

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const match = Array.from(cells).some(cell => {
            return cell.textContent.toLowerCase().includes(searchTerm);
        });

        row.style.display = match ? '' : 'none'; // Show or hide row based on match
    });
}