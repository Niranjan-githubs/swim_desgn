const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/reviews';
const outputDir = './public/reviews/compressed';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all jpg files from input directory
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg'));

async function compressImages() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      await sharp(inputPath)
        .resize(400, 300, { fit: 'cover' })
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const compressedSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      console.log(`${file}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(compressedSize / 1024 / 1024).toFixed(1)}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`Error compressing ${file}:`, error);
    }
  }
}

compressImages(); 