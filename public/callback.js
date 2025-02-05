// White label ID from the creation script
const WHITE_LABEL_ID = "{{WHITE_LABEL_ID_PLACEHOLDER}}";

document.addEventListener('DOMContentLoaded', async () => {
    const statusElement = document.getElementById('status');
    const messageElement = document.getElementById('message');

    // Get code and state from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (!code || !state) {
        statusElement.textContent = 'Error';
        messageElement.textContent = 'Missing required parameters';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8001/white_labels/${WHITE_LABEL_ID}/oauth2/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                whiteLabelId: WHITE_LABEL_ID,
                code,
                metadata: {
                    organizationId: "your-users-organization-id",
                    userId: "your-users-user-id",
                    email: "your-users-email"
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to exchange code');
        }

        statusElement.textContent = 'Success!';
        messageElement.textContent = 'Your Notion workspace has been connected. Data sync will begin shortly.';
    } catch (error) {
        console.error('Failed to complete OAuth flow:', error);
        statusElement.textContent = 'Error';
        messageElement.textContent = 'Failed to connect your Notion workspace. Please try again.';
    }
}); 