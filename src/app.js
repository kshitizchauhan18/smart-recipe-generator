// Main Application Entry Point
import './new-style.css';
import { recipes, commonIngredients } from './data/recipes.js';
import { recognizeIngredientsFromImage, validateImageFile, getIngredientSuggestions } from './utils/imageRecognition.js';
import { matchRecipes, getSubstitutions, adjustServings, getPersonalizedRecommendations } from './utils/recipeMatching.js';
import { getFavorites, addFavorite, removeFavorite, isFavorite, getRatings, setRating, getRating, getPreferences, updatePreferences, addRecentIngredients } from './utils/storage.js';

// App State
export const state = {
  currentTab: 'find-recipes',
  selectedIngredients: [],
  filteredRecipes: [],
  currentRecipe: null,
  uploadedImage: null,
  filters: {
    difficulty: 'All',
    maxCookingTime: '',
    dietary: [],
    cuisine: 'All',
    maxCalories: ''
  }
};

// Initialize App - will be called from main.js after all modules loaded
export function initApp(helpers) {
  renderApp();
  helpers.setupEventListeners();
  helpers.loadUserPreferences();
}

// Render Main App Structure
function renderApp() {
  document.querySelector('#app').innerHTML = `
    <div class="header">
      <h1>🍳 Smart Recipe Generator</h1>
      <p>Discover delicious recipes based on your available ingredients</p>
    </div>

    <div class="tabs">
      <button class="tab-button active" data-tab="find-recipes">
        🔍 Find Recipes
      </button>
      <button class="tab-button" data-tab="favorites">
        ❤️ Favorites
      </button>
      <button class="tab-button" data-tab="recommendations">
        ⭐ Recommendations
      </button>
      <button class="tab-button" data-tab="preferences">
        ⚙️ Preferences
      </button>
    </div>

    <div class="content">
      <!-- Find Recipes Section -->
      <div id="find-recipes" class="section active">
        ${renderFindRecipesSection()}
      </div>

      <!-- Favorites Section -->
      <div id="favorites" class="section">
        ${renderFavoritesSection()}
      </div>

      <!-- Recommendations Section -->
      <div id="recommendations" class="section">
        ${renderRecommendationsSection()}
      </div>

      <!-- Preferences Section -->
      <div id="preferences" class="section">
        ${renderPreferencesSection()}
      </div>
    </div>

    <!-- Recipe Modal -->
    <div id="recipe-modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="modal-close" onclick="closeRecipeModal()">×</button>
          <div id="modal-header-content"></div>
        </div>
        <div class="modal-body" id="modal-body-content"></div>
      </div>
    </div>
  `;
}

// Render Find Recipes Section
function renderFindRecipesSection() {
  return `
    <h2>Find Your Perfect Recipe</h2>
    
    <div class="form-group">
      <label>📸 Upload Ingredient Photo (Optional)</label>
      <div class="image-upload" id="image-upload-area">
        <p style="font-size: 3rem; margin-bottom: 10px;">📷</p>
        <p><strong>Click to upload</strong> or drag and drop</p>
        <p style="font-size: 0.9rem; color: var(--gray); margin-top: 5px;">
          Supports: JPEG, PNG, WebP (Max 10MB)
        </p>
        <input type="file" id="image-input" accept="image/*" style="display: none;">
      </div>
      <div id="image-preview-container" class="hidden"></div>
    </div>

    <div class="form-group">
      <label>🥘 Add Ingredients</label>
      <div class="ingredients-input-container">
        <input 
          type="text" 
          id="ingredient-input" 
          placeholder="Type ingredient name (e.g., chicken, tomato)"
          style="flex: 1;"
        />
        <button class="btn-primary" onclick="addIngredient()">Add</button>
      </div>
      <div id="suggestions-container"></div>
      <div class="ingredients-list" id="ingredients-list"></div>
    </div>

    <div class="filters" id="filters">
      <div class="filter-group">
        <label>Difficulty</label>
        <select id="filter-difficulty" onchange="updateFilters()">
          <option value="All">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Max Cooking Time (minutes)</label>
        <input type="number" id="filter-time" placeholder="e.g., 30" onchange="updateFilters()">
      </div>

      <div class="filter-group">
        <label>Cuisine</label>
        <select id="filter-cuisine" onchange="updateFilters()">
          <option value="All">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Indian">Indian</option>
          <option value="Thai">Thai</option>
          <option value="Japanese">Japanese</option>
          <option value="Greek">Greek</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Fusion">Fusion</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Max Calories</label>
        <input type="number" id="filter-calories" placeholder="e.g., 500" onchange="updateFilters()">
      </div>

      <div class="filter-group">
        <label>Dietary Restrictions</label>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" value="vegetarian" onchange="updateDietaryFilters()">
            <span>Vegetarian</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" value="vegan" onchange="updateDietaryFilters()">
            <span>Vegan</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" value="gluten-free" onchange="updateDietaryFilters()">
            <span>Gluten-Free</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" value="keto" onchange="updateDietaryFilters()">
            <span>Keto</span>
          </label>
        </div>
      </div>
    </div>

    <div class="text-center mt-20">
      <button class="btn-primary" onclick="searchRecipes()" style="font-size: 1.1rem; padding: 15px 40px;">
        🔍 Search Recipes
      </button>
    </div>

    <div id="recipes-results"></div>
  `;
}

// Render Favorites Section
function renderFavoritesSection() {
  const favorites = getFavorites();
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  if (favoriteRecipes.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">❤️</div>
        <h3>No Favorite Recipes Yet</h3>
        <p>Start adding recipes to your favorites and they'll appear here!</p>
      </div>
    `;
  }

  return `
    <h2>❤️ Your Favorite Recipes</h2>
    <div class="recipes-grid">
      ${favoriteRecipes.map(recipe => renderRecipeCard(recipe, false)).join('')}
    </div>
  `;
}

// Render Recommendations Section  
function renderRecommendationsSection() {
  const userRatings = getRatings();
  const preferences = getPreferences();
  const recommendations = getPersonalizedRecommendations(recipes, userRatings, preferences);

  if (recommendations.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">⭐</div>
        <h3>No Recommendations Yet</h3>
        <p>Rate some recipes to get personalized recommendations!</p>
      </div>
    `;
  }

  return `
    <h2>⭐ Personalized Recommendations</h2>
    <p style="text-align: center; color: var(--gray); margin-bottom: 30px;">
      Based on your ratings and preferences
    </p>
    <div class="recipes-grid">
      ${recommendations.slice(0, 12).map(recipe => renderRecipeCard(recipe, false)).join('')}
    </div>
  `;
}

// Render Preferences Section
function renderPreferencesSection() {
  const prefs = getPreferences();

  return `
    <h2>⚙️ Your Preferences</h2>
    
    <div class="form-group">
      <label>Dietary Preferences</label>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" value="vegetarian" ${prefs.dietary.includes('vegetarian') ? 'checked' : ''} onchange="saveDietaryPreference(this)">
          <span>Vegetarian</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" value="vegan" ${prefs.dietary.includes('vegan') ? 'checked' : ''} onchange="saveDietaryPreference(this)">
          <span>Vegan</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" value="gluten-free" ${prefs.dietary.includes('gluten-free') ? 'checked' : ''} onchange="saveDietaryPreference(this)">
          <span>Gluten-Free</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" value="keto" ${prefs.dietary.includes('keto') ? 'checked' : ''} onchange="saveDietaryPreference(this)">
          <span>Keto</span>
        </label>
      </div>
    </div>

    <div class="form-group">
      <label>Favorite Cuisine</label>
      <select id="pref-cuisine" onchange="saveCuisinePreference(this.value)">
        <option value="">No Preference</option>
        <option value="Italian" ${prefs.favoriteCuisine === 'Italian' ? 'selected' : ''}>Italian</option>
        <option value="Asian" ${prefs.favoriteCuisine === 'Asian' ? 'selected' : ''}>Asian</option>
        <option value="American" ${prefs.favoriteCuisine === 'American' ? 'selected' : ''}>American</option>
        <option value="Mexican" ${prefs.favoriteCuisine === 'Mexican' ? 'selected' : ''}>Mexican</option>
        <option value="Mediterranean" ${prefs.favoriteCuisine === 'Mediterranean' ? 'selected' : ''}>Mediterranean</option>
        <option value="Indian" ${prefs.favoriteCuisine === 'Indian' ? 'selected' : ''}>Indian</option>
      </select>
    </div>

    <div class="form-group">
      <label>Preferred Difficulty</label>
      <select id="pref-difficulty" onchange="saveDifficultyPreference(this.value)">
        <option value="">No Preference</option>
        <option value="Easy" ${prefs.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
        <option value="Medium" ${prefs.difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
        <option value="Hard" ${prefs.difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
      </select>
    </div>

    <div class="alert alert-success mt-20">
      ✓ Preferences saved automatically and used for personalized recommendations
    </div>
  `;
}

// Render Recipe Card
function renderRecipeCard(recipe, showMatchScore = true) {
  const matchClass = recipe.matchScore >= 70 ? '' : recipe.matchScore >= 40 ? 'medium' : 'low';
  const favorite = isFavorite(recipe.id);
  const userRating = getRating(recipe.id);

  return `
    <div class="recipe-card" onclick="openRecipeModal(${recipe.id})">
      <div class="recipe-header">
        <div class="recipe-emoji">${recipe.image}</div>
        <h3>${recipe.name}</h3>
        <div class="recipe-cuisine">${recipe.cuisine} Cuisine</div>
      </div>
      <div class="recipe-body">
        ${showMatchScore && recipe.matchScore !== undefined ? `
          <div class="match-score ${matchClass}">
            ${recipe.matchScore}% Match
          </div>
        ` : ''}
        
        <div class="recipe-info">
          <div class="recipe-info-item">
            <span class="recipe-info-label">Difficulty</span>
            <span class="recipe-info-value">${recipe.difficulty}</span>
          </div>
          <div class="recipe-info-item">
            <span class="recipe-info-label">Time</span>
            <span class="recipe-info-value">${recipe.cookingTime}min</span>
          </div>
          <div class="recipe-info-item">
            <span class="recipe-info-label">Calories</span>
            <span class="recipe-info-value">${recipe.nutrition.calories}</span>
          </div>
        </div>

        ${recipe.dietary && recipe.dietary.length > 0 ? `
          <div style="margin-bottom: 10px;">
            ${recipe.dietary.map(d => `<span style="background: var(--secondary); color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; margin-right: 5px; display: inline-block;">${d}</span>`).join('')}
          </div>
        ` : ''}

        ${showMatchScore && recipe.missingIngredients && recipe.missingIngredients.length > 0 ? `
          <div class="missing-ingredients">
            <strong>Missing (${recipe.missingIngredients.length}):</strong>
            ${recipe.missingIngredients.slice(0, 3).join(', ')}${recipe.missingIngredients.length > 3 ? '...' : ''}
          </div>
        ` : ''}

        ${userRating > 0 ? `
          <div style="text-align: center; margin-top: 10px; color: var(--accent); font-size: 1.2rem;">
            ${'★'.repeat(userRating)}${'☆'.repeat(5 - userRating)}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Export functions to be used by helpers.js and modal.js
export {
  renderApp,
  renderFindRecipesSection,
  renderFavoritesSection,
  renderRecommendationsSection,
  renderPreferencesSection,
  renderRecipeCard
};
