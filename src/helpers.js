// Helper Functions and Event Handlers - Part 2
import { recipes } from './data/recipes.js';
import { recognizeIngredientsFromImage, validateImageFile, getIngredientSuggestions } from './utils/imageRecognition.js';
import { matchRecipes } from './utils/recipeMatching.js';
import { isFavorite, getRating, addRecentIngredients } from './utils/storage.js';
import { state, renderFavoritesSection, renderRecommendationsSection, renderRecipeCard } from './app.js';
import { showLoading, hideLoading, showAlert, loadUserPreferences as loadPrefs } from './modal.js';

// Re-export for app.js
export const loadUserPreferences = loadPrefs;

// Setup Event Listeners
export function setupEventListeners() {
  // Tab Navigation
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;
      switchTab(tab);
    });
  });

  // Image Upload
  const imageUploadArea = document.getElementById('image-upload-area');
  const imageInput = document.getElementById('image-input');

  if (imageUploadArea && imageInput) {
    imageUploadArea.addEventListener('click', () => imageInput.click());

    imageUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageUploadArea.classList.add('dragging');
    });

    imageUploadArea.addEventListener('dragleave', () => {
      imageUploadArea.classList.remove('dragging');
    });

    imageUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      imageUploadArea.classList.remove('dragging');
      const file = e.dataTransfer.files[0];
      if (file) {
        handleImageUpload(file);
      }
    });

    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    });
  }

  // Ingredient Input
  const ingredientInput = document.getElementById('ingredient-input');
  if (ingredientInput) {
    ingredientInput.addEventListener('keyup', handleIngredientInput);
    ingredientInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addIngredient();
      }
    });
  }

  // Modal Close on Background Click
  const modal = document.getElementById('recipe-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeRecipeModal();
      }
    });
  }
}

// Switch Tabs
export function switchTab(tabName) {
  state.currentTab = tabName;

  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });

  // Update sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(tabName)?.classList.add('active');

  // Re-render sections that need fresh data
  if (tabName === 'favorites') {
    document.getElementById('favorites').innerHTML = renderFavoritesSection();
  } else if (tabName === 'recommendations') {
    document.getElementById('recommendations').innerHTML = renderRecommendationsSection();
  }
}

// Handle Image Upload
export async function handleImageUpload(file) {
  const validation = validateImageFile(file);
  
  if (!validation.valid) {
    showAlert(validation.error, 'error');
    return;
  }

  showLoading('Analyzing image...');

  try {
    const result = await recognizeIngredientsFromImage(file);
    
    if (result.success) {
      // Show preview
      const previewContainer = document.getElementById('image-preview-container');
      previewContainer.innerHTML = `
        <div class="image-preview">
          <img src="${result.imagePreview}" alt="Uploaded image" />
        </div>
        <div class="alert alert-success">
          ✓ Detected ${result.ingredients.length} ingredients with ${Math.round(result.confidence * 100)}% confidence
        </div>
      `;
      previewContainer.classList.remove('hidden');

      // Add detected ingredients
      result.ingredients.forEach(ingredient => {
        if (!state.selectedIngredients.includes(ingredient)) {
          state.selectedIngredients.push(ingredient);
        }
      });

      updateIngredientsDisplay();
      hideLoading();
    } else {
      hideLoading();
      showAlert(result.error || 'Failed to process image', 'error');
    }
  } catch (error) {
    hideLoading();
    showAlert('Error processing image: ' + error.message, 'error');
  }
}

// Handle Ingredient Input with Autocomplete
export function handleIngredientInput(e) {
  const input = e.target.value.trim();
  const suggestionsContainer = document.getElementById('suggestions-container');

  if (input.length < 2) {
    suggestionsContainer.innerHTML = '';
    return;
  }

  const suggestions = getIngredientSuggestions(input);

  if (suggestions.length > 0) {
    suggestionsContainer.innerHTML = `
      <div class="suggestions-dropdown">
        ${suggestions.map(suggestion => `
          <div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">
            ${suggestion}
          </div>
        `).join('')}
      </div>
    `;
  } else {
    suggestionsContainer.innerHTML = '';
  }
}

// Select Suggestion
window.selectSuggestion = function(ingredient) {
  document.getElementById('ingredient-input').value = ingredient;
  document.getElementById('suggestions-container').innerHTML = '';
  addIngredient();
};

// Add Ingredient
window.addIngredient = function() {
  const input = document.getElementById('ingredient-input');
  const ingredient = input.value.trim().toLowerCase();

  if (!ingredient) {
    return;
  }

  if (state.selectedIngredients.includes(ingredient)) {
    showAlert('Ingredient already added!', 'info');
    input.value = '';
    return;
  }

  state.selectedIngredients.push(ingredient);
  input.value = '';
  document.getElementById('suggestions-container').innerHTML = '';
  updateIngredientsDisplay();
};

// Remove Ingredient
window.removeIngredient = function(ingredient) {
  state.selectedIngredients = state.selectedIngredients.filter(i => i !== ingredient);
  updateIngredientsDisplay();
};

// Update Ingredients Display
function updateIngredientsDisplay() {
  const container = document.getElementById('ingredients-list');
  
  if (state.selectedIngredients.length === 0) {
    container.innerHTML = '<p style="color: var(--gray); font-style: italic;">No ingredients added yet</p>';
    return;
  }

  container.innerHTML = state.selectedIngredients.map(ingredient => `
    <span class="ingredient-tag">
      ${ingredient}
      <button onclick="removeIngredient('${ingredient}')" title="Remove">×</button>
    </span>
  `).join('');
}

// Update Filters
window.updateFilters = function() {
  state.filters.difficulty = document.getElementById('filter-difficulty').value;
  state.filters.maxCookingTime = document.getElementById('filter-time').value;
  state.filters.cuisine = document.getElementById('filter-cuisine').value;
  state.filters.maxCalories = document.getElementById('filter-calories').value;
};

// Update Dietary Filters
window.updateDietaryFilters = function() {
  const checkboxes = document.querySelectorAll('#filters input[type="checkbox"]');
  state.filters.dietary = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
};

// Search Recipes
window.searchRecipes = function() {
  if (state.selectedIngredients.length === 0) {
    showAlert('Please add at least one ingredient!', 'error');
    return;
  }

  showLoading('Finding perfect recipes for you...');

  // Save recent ingredients
  addRecentIngredients(state.selectedIngredients);

  setTimeout(() => {
    const matched = matchRecipes(recipes, state.selectedIngredients, state.filters);
    state.filteredRecipes = matched;

    const resultsContainer = document.getElementById('recipes-results');

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3>No Recipes Found</h3>
          <p>Try adjusting your filters or adding more ingredients</p>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = `
        <h2 style="margin-top: 40px; margin-bottom: 20px; text-align: center;">
          Found ${matched.length} Recipe${matched.length !== 1 ? 's' : ''}
        </h2>
        <div class="recipes-grid">
          ${matched.map(recipe => renderRecipeCard(recipe, true)).join('')}
        </div>
      `;
    }

    hideLoading();
  }, 800);
};

// Make functions available globally for HTML onclick handlers
window.addIngredient = addIngredient;
window.removeIngredient = removeIngredient;
window.selectSuggestion = selectSuggestion;
window.updateFilters = updateFilters;
window.updateDietaryFilters = updateDietaryFilters;
window.searchRecipes = searchRecipes;

// Export for use in app.js
export {
  updateIngredientsDisplay
};
