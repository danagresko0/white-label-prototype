#!/usr/bin/env bash
set -euo pipefail

echo "Starting build process..."

# Update theme colors from API
echo "Updating theme colors..."
bash scripts/set-custom-values.sh "$@"

# if $@ is null or empty skip down to installing dependencies and building the project
if [ -z "$@" ]; then
  echo "No theme specified. Skipping theme update."
  if [ -f "src/assets/i18n/en.json" ]; then
    echo "Removing existing translation files..."
    rm src/assets/i18n/en.json
  fi

else
  echo "Theme specified: $@"
fi

# fetch assets from ../assets.zip, unzip to src/assets, and remove the zip file
if [ -f "../../$@/assets.zip" ]; then
  echo "Unzipping assets..."



  unzip -o "../../$@/assets.zip" -d "."

  # if there is an i18n directory in the unzipped assets, move the contents of it to src/assets/i18n
  if [ -d "./assets/i18n" ]; then
    echo "Moving i18n files..."
    mv ./assets/i18n/* src/assets/i18n/
    rm -rf ./assets/i18n
  else 
    echo "No translation files found."
  fi

  # if there is an icon directory in the unzipped assets, move the contents of it to src/assets/i18n
  if [ -d "./assets/icons" ]; then
    echo "Moving icons files..."
    mv ./assets/icons/* src/assets/icon/
    rm -rf ./assets/icons
  else 
    echo "No icon files found."
  fi

  mv ./assets/* src/assets/
  rm -rf ./assets

    # if there is an i18n directory in the unzipped assets, move the contents of it to src/assets/i18n
  # if [ -d "src/assets/images/i18n" ]; then
  #   echo "Moving i18n files..."
  #   mv src/assets/images/i18n/* src/assets/i18n/
  #   rm -rf src/assets/images/i18n
  # else 
  #   echo "No translation files found."
  # fi  

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