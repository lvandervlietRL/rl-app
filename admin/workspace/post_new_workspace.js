// post_new_workspace.js
document.addEventListener('DOMContentLoaded', () => {
    // Part 1: Update Dashboard Table
    const updateButton = document.querySelector('.new-dashboards-button');

    if (updateButton) {
        updateButton.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Update button clicked.');

            const selectedDashboardElement = document.querySelector('.all-new-dashboards');
            const selectedDashboard = selectedDashboardElement ? selectedDashboardElement.value : null;

            console.log('Selected dashboard:', selectedDashboard);

            if (selectedDashboard && selectedDashboard !== "Selecteer een dashboard") {
                updateDashboardTable(selectedDashboard);
            } else {
                console.log('No dashboard selected.');
            }
        });
    } else {
        console.error('Element with class "new-dashboards-button" not found.');
    }

    function updateDashboardTable(selectedDashboard) {
        const workspaceDashboardsElement = document.querySelector('.new-workspace-dashboards');
    
        if (!workspaceDashboardsElement) {
            console.error('Element with class "new-workspace-dashboards" not found.');
            return;
        }
    
        if (typeof secondWebhookData === 'undefined' || secondWebhookData.length === 0) {
            console.error('secondWebhookData is not defined or is empty.');
            return;
        }
    
        console.log('Updating dashboard table with:', selectedDashboard);
        const dashboardData = secondWebhookData.find(item => item.fieldData.name === selectedDashboard);
    
        if (!dashboardData) {
            console.error('No matching dashboard found in secondWebhookData.');
            return;
        }
    
        let table = workspaceDashboardsElement.querySelector('table.admin-table');
        
        // If the table doesn't exist, create it and append it to the DOM
        if (!table) {
            table = document.createElement('table');
            table.classList.add('admin-table');
    
            const headerRow = document.createElement('tr');
            ['ID', 'Dashboard Name', 'Delete'].forEach(text => {
                const th = document.createElement('th');
                th.innerText = text;
                headerRow.appendChild(th);
            });
    
            table.appendChild(headerRow);
            workspaceDashboardsElement.appendChild(table);
        }
    
        // Check if the dashboard already exists in the table
        const existingRows = Array.from(table.querySelectorAll('tr'));
        const exists = existingRows.some(row => row.cells[1] && row.cells[1].innerText === dashboardData.fieldData.name);
    
        if (exists) {
            alert('This dashboard already exists.');
            return;
        }
    
        // Create a new row and append it to the table
        const row = document.createElement('tr');
    
        const idCell = document.createElement('td');
        idCell.innerText = dashboardData.id;
        row.appendChild(idCell);
    
        const nameCell = document.createElement('td');
        nameCell.innerText = dashboardData.fieldData.name;
        row.appendChild(nameCell);
    
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'x';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => row.remove());
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
    
        table.appendChild(row);
        console.log('New row added to the table.');
    }    

    // Part 2: Create Workspace Button
    const createWorkspaceButton = document.querySelector('.create-workspace-button');

    if (createWorkspaceButton) {
        createWorkspaceButton.addEventListener('click', function () {
            if (!firstWebhookData) {
                console.error('First webhook data not available.');
                return;
            }

            const workspaceNameElement = document.querySelector('.new-workspace-name');
            const workspaceSlugElement = document.querySelector('.new-workspace-slug');
            const workspaceDescriptionElement = document.querySelector('.new-workspace-description');
            const workspaceRoleElement = document.querySelector('.new-workspace-role');

            if (!workspaceNameElement || !workspaceSlugElement || !workspaceDescriptionElement || !workspaceRoleElement) {
                console.error('Error: Required workspace fields not found.');
                return;
            }

            const workspaceName = workspaceNameElement.value.trim();
            const workspaceSlug = workspaceSlugElement.value.trim();
            const workspaceDescription = workspaceDescriptionElement.value.trim();
            const workspaceRole = workspaceRoleElement.value.trim();

            const activeTab = document.querySelector('.w-tab-pane.w--tab-active');
            const dashboardTableRows = activeTab.querySelectorAll('.admin-table tr');
            const dashboards = Array.from(dashboardTableRows).slice(1).map(row => row.querySelector('td:first-child').textContent.trim());

            const payload = {
                isArchived: false,
                isDraft: false,
                fieldData: {
                    name: workspaceName,
                    slug: workspaceSlug,
                    "workspace-omschrijving": workspaceDescription,
                    rol: workspaceRole,
                    dashboards: dashboards
                }
            };

            fetch('https://hook.eu2.make.com/of2ey622p259nvhlrp1x8kjfz8376y4i', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from webhook:', data);
                showModal();
            })
            .catch(error => {
                console.error('Error sending data to the webhook:', error);
            });
        });
    } else {
        console.error('Button with class "create-workspace-button" not found.');
    }
});