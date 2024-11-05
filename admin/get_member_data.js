let memberData = [];

// Function to fetch member data and populate table
function fetchMemberData() {
    showLoadingOverlay();

    fetch('https://hook.eu2.make.com/xhmlwkil472n5249io31pk1ekddly33z', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        memberData = data.data;  // Store the fetched data globally
        populateMembersTable(data.data);
        hideLoadingOverlay();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        showFailureModal(error.message);
        hideLoadingOverlay();
    });
}

// Function to create and populate the members table with sorting capability
function populateMembersTable(members) {
    const tableContainer = document.querySelector('.members-table');

    if (!tableContainer) {
        console.error('Container for members table not found');
        return;
    }

    // Clear previous content
    tableContainer.innerHTML = '';

    // Create table and header row
    const table = document.createElement('table');
    table.id = 'members-data-table';
    const headerRow = document.createElement('tr');

    // Column headers with sorting functionality
    const headers = [
        { name: 'Email', key: 'auth.email' },
        { name: 'Plans', key: 'planConnections' },
        { name: 'First Name', key: 'customFields.first-name' },
        { name: 'Last Name', key: 'customFields.last-name' },
        { name: 'Actions', key: null }
    ];

    headers.forEach(header => {
        const headerCell = document.createElement('th');
        headerCell.textContent = header.name;

        if (header.key) {
            headerCell.classList.add('sortable');
            headerCell.addEventListener('click', () => sortTableByColumn(table, members, header.key));
        }

        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    populateRows(table, members);
    tableContainer.appendChild(table);
}

// Standalone function to populate table rows
function populateRows(table, members) {
    table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

    members.forEach(member => {
        const row = document.createElement('tr');

        // Email cell
        const emailCell = document.createElement('td');
        emailCell.textContent = member.auth.email;
        row.appendChild(emailCell);

        // Plan cell
        const planConnectionsCell = document.createElement('td');
        planConnectionsCell.textContent = member.planConnections 
            ? member.planConnections.map(connection => connection.planName).join(', ') 
            : 'N/A';
        row.appendChild(planConnectionsCell);

        // First Name and Last Name cells
        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = member.customFields['first-name'] || 'N/A';
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = member.customFields['last-name'] || 'N/A';
        row.appendChild(lastNameCell);

        // Edit button cell
        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.setAttribute('data-id', member.id);
        editButton.addEventListener('click', () => {
            const memberId = editButton.getAttribute('data-id');
            const memberItem = memberData.find(item => item.id === memberId);
            if (memberItem) {
                showEditModal(memberItem);
            } else {
                console.error('Member data not found for ID:', memberId);
            }
        });
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        table.appendChild(row);
    });
}

// Function to sort table by column
function sortTableByColumn(table, members, columnKey) {
    const sortedMembers = [...members].sort((a, b) => {
        const valueA = columnKey.split('.').reduce((obj, key) => obj[key], a) || '';
        const valueB = columnKey.split('.').reduce((obj, key) => obj[key], b) || '';
        return valueA > valueB ? 1 : -1;
    });
    populateRows(table, sortedMembers);
}

// Function to sort table by a given column
function sortTableByColumn(table, members, key) {
    // Toggle the sorting order (asc or desc)
    let sortOrder = table.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
    table.dataset.sortOrder = sortOrder;

    // Sort members array
    members.sort((a, b) => {
        const aValue = key === 'planConnections'
            ? a[key] ? a[key].map(conn => conn.planName).join(', ') : 'N/A'
            : a.customFields[key] || a.auth[key] || '';

        const bValue = key === 'planConnections'
            ? b[key] ? b[key].map(conn => conn.planName).join(', ') : 'N/A'
            : b.customFields[key] || b.auth[key] || '';

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Clear current rows and repopulate with sorted members
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    populateRows(members);
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