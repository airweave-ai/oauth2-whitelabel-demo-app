// White label ID from the creation script
const WHITE_LABEL_ID = "{{WHITE_LABEL_ID_PLACEHOLDER}}";

document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    
    connectButton.addEventListener('click', async () => {
        try {
            // Get the OAuth URL for the white label
            const response = await fetch(`http://localhost:8001/connections/oauth2/white-label/${WHITE_LABEL_ID}/auth_url`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to get OAuth URL');
            }

            const data = await response.json();
            window.location.href = data;
        } catch (error) {
            console.error('Failed to initiate OAuth flow:', error);
            alert('Failed to connect to Airweave. Please try again.');
        }
    });
}); 