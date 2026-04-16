#!/usr/bin/env bash
set -euo pipefail

echo "Starting build process..."

# Update theme colors from API
echo "Updating theme colors..."
bash scripts/set-custom-values.sh "$@"

# fetch assets from ../assets.zip, unzip to src/assets, and remove the zip file
if [ -f "../../$@/assets.zip" ]; then
  echo "Unzipping assets..."
  unzip -o "../../$@/assets.zip" -d "src/assets/images"

    # if there is an i18n directory in the unzipped assets, move it to src/assets/i18n
    if [ -d "src/assets/images/i18n" ]; then
      echo "Moving i18n assets..."
      mv "src/assets/images/i18n" "src/assets/i18n"
    fi  

else
  echo "No assets.zip file found. Skipping asset update."
fi  

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Angular/Ionic project
echo "Building project..."
npm run build

echo "Build complete!"