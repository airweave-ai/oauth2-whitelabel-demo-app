#!/bin/bash

echo "Creating white label integration for Notion... (typically you would do this in the Airweave UI)"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is not installed. Installing jq..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install jq
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update && sudo apt-get install -y jq
    else
        echo "Error: Could not install jq. Please install it manually and try again."
        exit 1
    fi
fi


white_label_id=$(curl -X POST -H "Content-Type: application/json" \
  --location \
  -d '{
  "name": "Notion White Label Demo",
  "source_short_name": "notion",
  "redirect_url": "http://localhost:3000/callback.html",
  "client_id": "6769618979345.8289604264455",
  "client_secret": "e27c2e6b34a46987ee1707bd0d9aba15"
}' 'http://localhost:8001/white_labels/' | jq -r '.id')

echo ""
echo "White label integration created. You can view it at http://localhost:8080/white-label/$white_label_id"

echo "Updating public/app.js and callback.js with white label id..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS version
    sed -i '' "s/{{WHITE_LABEL_ID_PLACEHOLDER}}/$white_label_id/g" public/app.js
    sed -i '' "s/{{WHITE_LABEL_ID_PLACEHOLDER}}/$white_label_id/g" public/callback.js
else
    # Linux version
    sed -i "s/{{WHITE_LABEL_ID_PLACEHOLDER}}/$white_label_id/g" public/app.js
    sed -i "s/{{WHITE_LABEL_ID_PLACEHOLDER}}/$white_label_id/g" public/callback.js
fi

echo "Done!"
echo "You can now run the demo app by running:"
echo "cd public && python3 -m http.server 3000"
echo "Then open http://localhost:3000 in your browser."
echo "You can now connect your Slack workspace to the demo app."
echo ""
echo "If you have any questions, please reach out to us at support@airweave.ai"