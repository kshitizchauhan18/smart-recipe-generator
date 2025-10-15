// Modal and Utility Functions - Part 3
import { recipes } from './data/recipes.js';
import { getSubstitutions, adjustServings } from './utils/recipeMatching.js';
import { isFavorite, addFavorite, removeFavorite, getRating, setRating, getPreferences, updatePreferences } from './utils/storage.js';
import { state } from './app.js';

// Open Recipe Modal
function openRecipeModal(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  state.currentRecipe = recipe;
  const modal = document.getElementById('recipe-modal');
  const favorite = isFavorite(recipe.id);
  const userRating = getRating(recipe.id);

  // Render modal header
  document.getElementById('modal-header-content').innerHTML = `
    <div class="recipe-emoji" style="font-size: 4rem; margin-bottom: 15px;">${recipe.image}</div>
    <h2 style="margin-bottom: 10px;">${recipe.name}</h2>
    <p style="font-size: 1.1rem; opacity: 0.9;">${recipe.cuisine} Cuisine • ${recipe.difficulty}</p>
  `;

  // Render modal body
  document.getElementById('modal-body-content').innerHTML = `
    <!-- Rating Section -->
    <div class="rating-container">
      <h3 style="margin-bottom: 15px;">Rate this recipe</h3>
      <div class="stars" id="rating-stars">
        ${[1, 2, 3, 4, 5].map(star => `
          <span class="star ${star <= userRating ? 'filled' : ''}" onclick="rateRecipe(${recipe.id}, ${star})">★</span>
        `).join('')}
      </div>
      ${userRating > 0 ? `<p style="margin-top: 10px; color: var(--gray);">Your rating: ${userRating} star${userRating !== 1 ? 's' : ''}</p>` : ''}
    </div>

    <!-- Quick Info -->
    <div class="recipe-info" style="margin: 30px 0; padding: 20px; background: var(--light); border-radius: 12px;">
      <div class="recipe-info-item">
        <span class="recipe-info-label">⏱️ Cooking Time</span>
        <span class="recipe-info-value">${recipe.cookingTime} minutes</span>
      </div>
      <div class="recipe-info-item">
        <span class="recipe-info-label">👥 Servings</span>
        <span class="recipe-info-value">${recipe.servings} people</span>
      </div>
      <div class="recipe-info-item">
        <span class="recipe-info-label">📊 Difficulty</span>
        <span class="recipe-info-value">${recipe.difficulty}</span>
      </div>
    </div>

    <!-- Servings Adjustment -->
    <div class="form-group" style="max-width: 300px; margin: 0 auto 30px;">
      <label>Adjust Servings</label>
      <div style="display: flex; align-items: center; gap: 15px; justify-content: center;">
        <button class="btn-outline btn-small" onclick="adjustModalServings(-1)">−</button>
        <span id="modal-servings" style="font-size: 1.3rem; font-weight: 700; min-width: 60px; text-align: center;">
          ${recipe.servings}
        </span>
        <button class="btn-outline btn-small" onclick="adjustModalServings(1)">+</button>
      </div>
    </div>

    <!-- Ingredients -->
    <div class="recipe-section">
      <h3>📝 Ingredients</h3>
      <div class="ingredients-grid" id="modal-ingredients">
        ${recipe.ingredients.map((ingredient, idx) => {
          const substitutions = getSubstitutions(ingredient);
          return `
            <div class="ingredient-item">
              ${ingredient}
              ${substitutions.length > 0 ? `
                <div style="font-size: 0.8rem; color: var(--gray); margin-top: 5px;" title="${substitutions.join(', ')}">
                  💡 ${substitutions.length} substitution${substitutions.length !== 1 ? 's' : ''} available
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Instructions -->
    <div class="recipe-section">
      <h3>👨‍🍳 Instructions</h3>
      <ol class="steps-list">
        ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>

    <!-- Nutrition Information -->
    <div class="recipe-section">
      <h3>📊 Nutrition Information</h3>
      <p style="color: var(--gray); margin-bottom: 15px;">Per serving</p>
      <div class="nutrition-grid" id="modal-nutrition">
        <div class="nutrition-item">
          <span class="nutrition-value">${recipe.nutrition.calories}</span>
          <span class="nutrition-label">Calories</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-value">${recipe.nutrition.protein}g</span>
          <span class="nutrition-label">Protein</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-value">${recipe.nutrition.carbs}g</span>
          <span class="nutrition-label">Carbs</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-value">${recipe.nutrition.fat}g</span>
          <span class="nutrition-label">Fat</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-value">${recipe.nutrition.fiber}g</span>
          <span class="nutrition-label">Fiber</span>
        </div>
      </div>
    </div>

    ${recipe.dietary && recipe.dietary.length > 0 ? `
      <div class="recipe-section">
        <h3>🏷️ Dietary Tags</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${recipe.dietary.map(tag => `
            <span style="background: var(--secondary); color: white; padding: 10px 20px; border-radius: 20px; font-weight: 600;">
              ${tag}
            </span>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Actions -->
    <div style="display: flex; gap: 15px; margin-top: 30px;">
      <button class="btn-primary" onclick="toggleFavorite(${recipe.id})" style="flex: 1;">
        ${favorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
      </button>
      <button class="btn-secondary" onclick="shareRecipe(${recipe.id})" style="flex: 1;">
        📤 Share Recipe
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Recipe Modal
function closeRecipeModal() {
  const modal = document.getElementById('recipe-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  state.currentRecipe = null;
}

// Adjust Servings in Modal
window.adjustModalServings = function(change) {
  if (!state.currentRecipe) return;

  const currentServings = state.currentRecipe.servings;
  const newServings = Math.max(1, currentServings + change);

  if (newServings === currentServings) return;

  const adjustedRecipe = adjustServings(state.currentRecipe, newServings);
  state.currentRecipe = adjustedRecipe;

  // Update display
  document.getElementById('modal-servings').textContent = newServings;
  
  // Update nutrition
  const nutrition = adjustedRecipe.nutrition;
  document.getElementById('modal-nutrition').innerHTML = `
    <div class="nutrition-item">
      <span class="nutrition-value">${nutrition.calories}</span>
      <span class="nutrition-label">Calories</span>
    </div>
    <div class="nutrition-item">
      <span class="nutrition-value">${nutrition.protein}g</span>
      <span class="nutrition-label">Protein</span>
    </div>
    <div class="nutrition-item">
      <span class="nutrition-value">${nutrition.carbs}g</span>
      <span class="nutrition-label">Carbs</span>
    </div>
    <div class="nutrition-item">
      <span class="nutrition-value">${nutrition.fat}g</span>
      <span class="nutrition-label">Fat</span>
    </div>
    <div class="nutrition-item">
      <span class="nutrition-value">${nutrition.fiber}g</span>
      <span class="nutrition-label">Fiber</span>
    </div>
  `;
};

// Rate Recipe
window.rateRecipe = function(recipeId, rating) {
  setRating(recipeId, rating);
  
  // Update stars
  const stars = document.querySelectorAll('#rating-stars .star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });

  showAlert(`Rated ${rating} star${rating !== 1 ? 's' : ''}!`, 'success');
};

// Toggle Favorite
window.toggleFavorite = function(recipeId) {
  if (isFavorite(recipeId)) {
    removeFavorite(recipeId);
    showAlert('Removed from favorites', 'info');
  } else {
    addFavorite(recipeId);
    showAlert('Added to favorites!', 'success');
  }
  
  // Re-open modal to update button
  closeRecipeModal();
  setTimeout(() => openRecipeModal(recipeId), 100);
};

// Share Recipe
window.shareRecipe = function(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const shareText = `Check out this recipe: ${recipe.name} - ${recipe.cuisine} cuisine, ready in ${recipe.cookingTime} minutes!`;
  
  if (navigator.share) {
    navigator.share({
      title: recipe.name,
      text: shareText,
      url: window.location.href
    }).then(() => {
      showAlert('Recipe shared!', 'success');
    }).catch(() => {
      copyToClipboard(shareText);
    });
  } else {
    copyToClipboard(shareText);
  }
};

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showAlert('Recipe details copied to clipboard!', 'success');
  }).catch(() => {
    showAlert('Could not copy to clipboard', 'error');
  });
}

// Preference Savers
window.saveDietaryPreference = function(checkbox) {
  const prefs = getPreferences();
  if (checkbox.checked) {
    if (!prefs.dietary.includes(checkbox.value)) {
      prefs.dietary.push(checkbox.value);
    }
  } else {
    prefs.dietary = prefs.dietary.filter(d => d !== checkbox.value);
  }
  updatePreferences({ dietary: prefs.dietary });
  showAlert('Dietary preference saved!', 'success');
};

window.saveCuisinePreference = function(cuisine) {
  updatePreferences({ favoriteCuisine: cuisine || null });
  showAlert('Cuisine preference saved!', 'success');
};

window.saveDifficultyPreference = function(difficulty) {
  updatePreferences({ difficulty: difficulty || null });
  showAlert('Difficulty preference saved!', 'success');
};

// Load User Preferences
function loadUserPreferences() {
  const prefs = getPreferences();
  
  // Apply dietary preferences to filters if available
  if (prefs.dietary && prefs.dietary.length > 0) {
    const checkboxes = document.querySelectorAll('#filters input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (prefs.dietary.includes(cb.value)) {
        cb.checked = true;
      }
    });
    updateDietaryFilters();
  }
}

// Show Loading
function showLoading(message = 'Loading...') {
  const resultsContainer = document.getElementById('recipes-results');
  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>${message}</p>
      </div>
    `;
  }
}

// Hide Loading
function hideLoading() {
  // Loading is replaced by actual content
}

// Show Alert
function showAlert(message, type = 'info') {
  const alertClass = type === 'error' ? 'alert-error' : type === 'success' ? 'alert-success' : 'alert-info';
  const icon = type === 'error' ? '❌' : type === 'success' ? '✓' : 'ℹ️';
  
  const alert = document.createElement('div');
  alert.className = `alert ${alertClass}`;
  alert.innerHTML = `${icon} ${message}`;
  alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; min-width: 300px; animation: slideIn 0.3s ease;';
  
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// Add animations for alerts
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Make functions available globally for HTML onclick handlers
window.openRecipeModal = openRecipeModal;
window.closeRecipeModal = closeRecipeModal;
window.adjustModalServings = adjustModalServings;
window.rateRecipe = rateRecipe;
window.toggleFavorite = toggleFavorite;
window.shareRecipe = shareRecipe;
window.saveDietaryPreference = saveDietaryPreference;
window.saveCuisinePreference = saveCuisinePreference;
window.saveDifficultyPreference = saveDifficultyPreference;

// Export everything needed by other modules
export {
  openRecipeModal,
  closeRecipeModal,
  showLoading,
  hideLoading,
  showAlert,
  loadUserPreferences
};
