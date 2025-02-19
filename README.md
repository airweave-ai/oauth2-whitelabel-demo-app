# Airweave Demo App

A simple HTML/CSS/JS demo showing how to integrate Slack using Airweave's white label OAuth2 flow.

## Setup

### If the Airweave server is not already running:

1. Clone the Airweave repository:
```bash
git clone https://github.com/airweave-ai/airweave.git
cd airweave
```

2. Start the Airweave backend:
```bash
chmod +x start.sh
./start.sh
```

### Main Setup Steps:

1. Create the white label integration. This will create a white label integration for Slack and put the white label id in the `public/app.js` file. Typically you would do this in the Airweave UI.
```bash
chmod +x bin/create-white-label.sh
./bin/create-white-label.sh
```

2. Serve the demo app (using any static file server, e.g., Python's built-in server):
```bash
cd public
python3 -m http.server 3000
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Files

- `public/index.html` - Main page with connect button
- `public/callback.html` - OAuth callback page
- `public/styles.css` - Styling
- `public/app.js` - Main JavaScript for OAuth flow
- `public/callback.js` - Callback handling
- `bin/create-white-label.sh` - Script to create white label integration