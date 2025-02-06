// White label ID from the creation script
const WHITE_LABEL_ID = "{{WHITE_LABEL_ID_PLACEHOLDER}}";

document.addEventListener('DOMContentLoaded', async () => {
    const statusElement = document.getElementById('status');
    const messageElement = document.getElementById('message');

    // Get code and state from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (!code) {
        statusElement.textContent = 'Error';
        messageElement.textContent = 'Missing required parameters';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8001/connections/oauth2/white-label/${WHITE_LABEL_ID}/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(code) 
        });

        if (!response.ok) {
            throw new Error('Failed to exchange code');
        }

        statusElement.textContent = 'Success!';
        messageElement.textContent = 'Your Asana workspace has been connected. Data sync will begin shortly.';
    } catch (error) {
        console.error('Failed to complete OAuth flow:', error);
        statusElement.textContent = 'Error';
        messageElement.textContent = 'Failed to connect your Asana workspace. Please try again.';
    }
}); 