// post_new_dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Create Dashboard Button
    const createDashboardButton = document.querySelector('.create-dashboard-button');

    if (createDashboardButton) {
        createDashboardButton.addEventListener('click', function () {
            if (!firstWebhookData) {
                console.error('First webhook data not available.');
                return;
            }

            const dashboardNameElement = document.querySelector('.new-dashboard-name');
            const dashboardSlugElement = document.querySelector('.new-dashboard-slug');
            const dashboardDescriptionElement = document.querySelector('.new-dashboard-description');
            const dashboardLinkElement = document.querySelector('.new-dashboard-link');

            if (!dashboardNameElement || !dashboardSlugElement || !dashboardDescriptionElement || !dashboardLinkElement) {
                console.error('Error: Required dashboard fields not found.');
                return;
            }

            const dashboardName = dashboardNameElement.value.trim();
            const dashboardSlug = dashboardSlugElement.value.trim();
            const dashboardDescription = dashboardDescriptionElement.value.trim();
            const dashboardLink = dashboardLinkElement.value.trim();

            const activeTab = document.querySelector('.w-tab-pane.w--tab-active');
            const dashboardTableRows = activeTab.querySelectorAll('.admin-table tr');
            const dashboards = Array.from(dashboardTableRows).slice(1).map(row => row.querySelector('td:first-child').textContent.trim());

            const payload = {
                isArchived: false,
                isDraft: false,
                fieldData: {
                    name: dashboardName,
                    slug: dashboardSlug,
                    "dashboard-omschrijving": dashboardDescription,
                    "public-link": dashboardLink
                }
            };

            fetch('https://hook.eu2.make.com/cl12dsm41btujsfpnoyej3p1cmdt868x', {
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
        console.error('Button with class "create-dashboard-button" not found.');
    }
});