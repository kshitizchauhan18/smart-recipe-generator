// Local Storage Utility for persisting user data

const STORAGE_KEYS = {
  FAVORITES: 'recipe_favorites',
  RATINGS: 'recipe_ratings',
  PREFERENCES: 'user_preferences',
  RECENT_INGREDIENTS: 'recent_ingredients'
};

/**
 * Get user's favorite recipes
 */
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

/**
 * Add recipe to favorites
 */
export function addFavorite(recipeId) {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(recipeId)) {
      favorites.push(recipeId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
}

/**
 * Remove recipe from favorites
 */
export function removeFavorite(recipeId) {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(id => id !== recipeId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
}

/**
 * Check if recipe is favorited
 */
export function isFavorite(recipeId) {
  return getFavorites().includes(recipeId);
}

/**
 * Get all user ratings
 */
export function getRatings() {
  try {
    const ratings = localStorage.getItem(STORAGE_KEYS.RATINGS);
    return ratings ? JSON.parse(ratings) : {};
  } catch (error) {
    console.error('Error reading ratings:', error);
    return {};
  }
}

/**
 * Set rating for a recipe
 */
export function setRating(recipeId, rating) {
  try {
    const ratings = getRatings();
    ratings[recipeId] = rating;
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
    return true;
  } catch (error) {
    console.error('Error setting rating:', error);
    return false;
  }
}

/**
 * Get rating for a specific recipe
 */
export function getRating(recipeId) {
  const ratings = getRatings();
  return ratings[recipeId] || 0;
}

/**
 * Get user preferences
 */
export function getPreferences() {
  try {
    const prefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return prefs ? JSON.parse(prefs) : {
      dietary: [],
      favoriteCuisine: null,
      difficulty: null
    };
  } catch (error) {
    console.error('Error reading preferences:', error);
    return { dietary: [], favoriteCuisine: null, difficulty: null };
  }
}

/**
 * Update user preferences
 */
export function updatePreferences(preferences) {
  try {
    const current = getPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error updating preferences:', error);
    return false;
  }
}

/**
 * Get recent ingredients
 */
export function getRecentIngredients() {
  try {
    const recent = localStorage.getItem(STORAGE_KEYS.RECENT_INGREDIENTS);
    return recent ? JSON.parse(recent) : [];
  } catch (error) {
    console.error('Error reading recent ingredients:', error);
    return [];
  }
}

/**
 * Add to recent ingredients
 */
export function addRecentIngredients(ingredients) {
  try {
    const recent = getRecentIngredients();
    const updated = [...new Set([...ingredients, ...recent])].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.RECENT_INGREDIENTS, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error adding recent ingredients:', error);
    return false;
  }
}

/**
 * Clear all user data
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}
