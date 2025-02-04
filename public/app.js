// White label ID from the creation script
const WHITE_LABEL_ID = 'slack-white-label-id';

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    
    connectButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:8001/whiteLabels/getOauth2AuthUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    whiteLabelId: WHITE_LABEL_ID,
                    state: 'organization-123' // Demo organization ID
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get OAuth URL');
            }

            const data = await response.json();
            window.location.href = data.authUrl;
        } catch (error) {
            console.error('Failed to initiate OAuth flow:', error);
            alert('Failed to connect to Slack. Please try again.');
        }
    });
}); 