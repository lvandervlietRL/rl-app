<script>
document.addEventListener('DOMContentLoaded', () => {
    // Part 1: Success Modal Creation
    const successModal = document.createElement('div');
    successModal.id = 'success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>Je wijzigingen zijn succesvol opgeslagen!</p>
        </div>`;
    document.body.appendChild(successModal);

    function showModal() {
        successModal.style.display = 'block';
    }

    function closeModal() {
        successModal.style.display = 'none';
        fetchWebhookData(); // Assuming fetchWebhookData is defined
    }

    const closeButton = successModal.querySelector('.close-button');
    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });

    // Part 2: Create Dashboard Button
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
</script>