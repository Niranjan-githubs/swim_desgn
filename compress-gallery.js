import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = './public/gallery';
const outputDir = './public/gallery/compressed';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all jpg files from input directory
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg'));

async function compressImages() {
  console.log('Starting compression of gallery images...\n');
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      await sharp(inputPath)
        .resize(800, 600, { fit: 'cover' })
        .jpeg({ quality: 75, progressive: true })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const compressedSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      console.log(`${file}:`);
      console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(1)}MB`);
      console.log(`  Compressed: ${(compressedSize / 1024 / 1024).toFixed(1)}MB`);
      console.log(`  Reduction: ${reduction}%\n`);
    } catch (error) {
      console.error(`Error compressing ${file}:`, error);
    }
  }
  
  console.log('Compression complete! Check the /compressed folder for optimized images.');
}

compressImages(); 