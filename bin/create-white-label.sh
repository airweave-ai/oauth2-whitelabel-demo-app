#!/bin/bash

echo "Creating white label integration for Asana... (typically you would do this in the Airweave UI)"

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
  "name": "TaskBot - Asana White Label Demo",
  "source_short_name": "asana",
  "redirect_url": "http://localhost:3000/callback.html",
  "client_id": "16dd872b-594c-8007-a0ee-00376e9a88a9",
  "client_secret": "secret_O3WlZnEMgG8zRX4taqkzoJT5VcDPIos3NVpOdo3YYUl"
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
echo "You can now connect your Asana workspace to the demo app."
echo ""
echo "If you have any questions, please reach out to us at support@airweave.ai"