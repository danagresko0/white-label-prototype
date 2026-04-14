#!/usr/bin/env bash
set -euo pipefail

TARGET="src/theme/custom_values.css"

API_URL="http://localhost:3000"

TENANT_ID="${1:-default}"

echo "Updating custom values from API for tenant: $TENANT_ID"

# if tenant id is default clear target file
if [ "$TENANT_ID" = "default" ]; then
    echo "Using default tenant. Clearing $TARGET."
    > "$TARGET"
    exit 0
fi

TENANT_API_URL="${API_URL}/${TENANT_ID}"

# Fetch color values from API endpoint
RESPONSE=$(curl -s "$TENANT_API_URL")

# Extract light and dark mode responses
LIGHT_RESPONSE=$(echo "$RESPONSE" | jq -r '.light')
DARK_RESPONSE=$(echo "$RESPONSE" | jq -r '.dark')

# Generate CSS variables for light mode
CSS_VARS_LIGHT=""
for key in $(echo "$LIGHT_RESPONSE" | jq -r 'keys[]'); do
    if [[ "$key" == --color-* ]]; then
        custom_key=$(echo "$key" | sed 's/--color-/--custom-color-/')
        value=$(echo "$LIGHT_RESPONSE" | jq -r ".[\"$key\"]")
        CSS_VARS_LIGHT="${CSS_VARS_LIGHT}    $custom_key: $value;
"
    fi
done

# Generate CSS variables for dark mode
CSS_VARS_DARK=""
for key in $(echo "$DARK_RESPONSE" | jq -r 'keys[]'); do
    if [[ "$key" == --color-* ]]; then
        custom_key=$(echo "$key" | sed 's/--color-/--custom-color-/')
        value=$(echo "$DARK_RESPONSE" | jq -r ".[\"$key\"]")
        CSS_VARS_DARK="${CSS_VARS_DARK}    $custom_key: $value;
"
    fi
done

cat > "$TARGET" <<EOF
:root {
$CSS_VARS_LIGHT
}

@media (prefers-color-scheme: dark) {
    :root {
$CSS_VARS_DARK
    }
}
EOF

echo "Updated $TARGET from $TENANT_API_URL"