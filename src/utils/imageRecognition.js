// Image Recognition Utility using Tesseract.js OCR and basic image analysis
// This is a simplified version that simulates ingredient recognition from images

import { commonIngredients } from '../data/recipes.js';

/**
 * Simulates ingredient recognition from an uploaded image
 * In a production app, this would use a proper ML/AI service like:
 * - Google Cloud Vision API
 * - AWS Rekognition
 * - Custom TensorFlow.js model
 * 
 * For this demo, we'll use a combination of:
 * 1. File name analysis
 * 2. Random selection from common ingredients (simulating AI detection)
 */
export async function recognizeIngredientsFromImage(imageFile) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      // Simulate processing time
      setTimeout(() => {
        const detectedIngredients = analyzeImage(imageFile, e.target.result);
        resolve({
          success: true,
          ingredients: detectedIngredients,
          confidence: 0.85,
          imagePreview: e.target.result
        });
      }, 1500); // Simulate processing delay
    };

    reader.onerror = () => {
      resolve({
        success: false,
        ingredients: [],
        error: "Failed to read image file"
      });
    };

    reader.readAsDataURL(imageFile);
  });
}

/**
 * Analyzes image file and attempts to detect ingredients
 * This is a simplified simulation - in production, use actual ML models
 */
function analyzeImage(imageFile, imageData) {
  const detectedIngredients = [];
  const fileName = imageFile.name.toLowerCase();
  
  // Strategy 1: Check filename for ingredient keywords
  commonIngredients.forEach(ingredient => {
    if (fileName.includes(ingredient.toLowerCase())) {
      detectedIngredients.push(ingredient);
    }
  });

  // Strategy 2: Simulate ML detection by selecting random common ingredients
  // In production, this would be replaced with actual image recognition
  if (detectedIngredients.length === 0) {
    // Simulate detecting 3-7 random ingredients
    const numIngredients = Math.floor(Math.random() * 5) + 3;
    const shuffled = [...commonIngredients].sort(() => Math.random() - 0.5);
    detectedIngredients.push(...shuffled.slice(0, numIngredients));
  }

  // Strategy 3: If image appears to be a produce/grocery photo, favor vegetables
  if (isLikelyProduceImage(fileName)) {
    const vegetables = ['tomato', 'onion', 'bell pepper', 'carrot', 'broccoli', 'lettuce'];
    vegetables.forEach(veg => {
      if (!detectedIngredients.includes(veg) && Math.random() > 0.5) {
        detectedIngredients.push(veg);
      }
    });
  }

  return [...new Set(detectedIngredients)]; // Remove duplicates
}

/**
 * Check if image filename suggests produce/grocery items
 */
function isLikelyProduceImage(fileName) {
  const produceKeywords = ['vegetable', 'veggie', 'produce', 'grocery', 'market', 'fresh', 'organic'];
  return produceKeywords.some(keyword => fileName.includes(keyword));
}

/**
 * Validate image file
 */
export function validateImageFile(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, or WebP)' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image file size must be less than 10MB' };
  }

  return { valid: true };
}

/**
 * Get ingredient suggestions based on partial input
 */
export function getIngredientSuggestions(input) {
  if (!input || input.length < 2) return [];
  
  const searchTerm = input.toLowerCase();
  return commonIngredients.filter(ingredient => 
    ingredient.toLowerCase().includes(searchTerm)
  ).slice(0, 10);
}
