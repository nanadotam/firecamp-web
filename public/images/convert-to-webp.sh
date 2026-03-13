#!/bin/bash

# Usage:
# ./convert-to-webp.sh input_folder output_folder

INPUT_DIR="$1"
OUTPUT_DIR="$2"

# Check arguments
if [ -z "$INPUT_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "Usage: ./convert-to-webp.sh input_folder output_folder"
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "Converting images from $INPUT_DIR to WebP..."

# Loop through images
for img in "$INPUT_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  [ -e "$img" ] || continue

  filename=$(basename "$img")
  name="${filename%.*}"

  output="$OUTPUT_DIR/$name.webp"

  echo "Converting $filename → $name.webp"

  ffmpeg -loglevel error -y \
    -i "$img" \
    -c:v libwebp \
    -quality 85 \
    -compression_level 6 \
    "$output"

done

echo "Done. WebP images saved to $OUTPUT_DIR"
