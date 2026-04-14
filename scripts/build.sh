#!/usr/bin/env bash
set -euo pipefail

echo "Starting build process..."

# Update theme colors from API
echo "Updating theme colors..."
bash scripts/set-custom-values.sh "$@"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Angular/Ionic project
echo "Building project..."
npm run build

echo "Build complete!"