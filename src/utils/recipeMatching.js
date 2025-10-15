// Recipe Matching Algorithm

/**
 * Calculate recipe match score based on available ingredients
 * Returns a score from 0-100 indicating how well the recipe matches
 */
export function calculateRecipeMatch(recipe, availableIngredients) {
  if (!availableIngredients || availableIngredients.length === 0) {
    return 0;
  }

  const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
  const available = availableIngredients.map(i => i.toLowerCase());
  
  let matchedIngredients = 0;
  let essentialMatches = 0;
  
  recipeIngredients.forEach((ingredient, index) => {
    if (available.includes(ingredient)) {
      matchedIngredients++;
      // First 5 ingredients are considered "essential"
      if (index < 5) {
        essentialMatches++;
      }
    }
  });

  const matchPercentage = (matchedIngredients / recipeIngredients.length) * 100;
  const essentialBonus = (essentialMatches / Math.min(5, recipeIngredients.length)) * 20;
  
  // Bonus for having all essential ingredients
  const score = Math.min(100, matchPercentage + essentialBonus);
  
  return Math.round(score);
}

/**
 * Get missing ingredients for a recipe
 */
export function getMissingIngredients(recipe, availableIngredients) {
  const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
  const available = availableIngredients.map(i => i.toLowerCase());
  
  return recipe.ingredients.filter(ingredient => 
    !available.includes(ingredient.toLowerCase())
  );
}

/**
 * Match recipes based on available ingredients and filters
 */
export function matchRecipes(recipes, availableIngredients, filters = {}) {
  let matchedRecipes = recipes.map(recipe => ({
    ...recipe,
    matchScore: calculateRecipeMatch(recipe, availableIngredients),
    missingIngredients: getMissingIngredients(recipe, availableIngredients)
  }));

  // Apply filters
  if (filters.difficulty && filters.difficulty !== 'All') {
    matchedRecipes = matchedRecipes.filter(r => r.difficulty === filters.difficulty);
  }

  if (filters.maxCookingTime) {
    matchedRecipes = matchedRecipes.filter(r => r.cookingTime <= parseInt(filters.maxCookingTime));
  }

  if (filters.dietary && filters.dietary.length > 0) {
    matchedRecipes = matchedRecipes.filter(recipe => 
      filters.dietary.every(diet => recipe.dietary.includes(diet))
    );
  }

  if (filters.cuisine && filters.cuisine !== 'All') {
    matchedRecipes = matchedRecipes.filter(r => r.cuisine === filters.cuisine);
  }

  if (filters.maxCalories) {
    matchedRecipes = matchedRecipes.filter(r => 
      r.nutrition.calories <= parseInt(filters.maxCalories)
    );
  }

  // Sort by match score (highest first)
  matchedRecipes.sort((a, b) => b.matchScore - a.matchScore);

  return matchedRecipes;
}

/**
 * Get ingredient substitutions
 */
export function getSubstitutions(ingredient) {
  const substitutionMap = {
    'butter': ['olive oil', 'coconut oil', 'margarine'],
    'milk': ['almond milk', 'soy milk', 'oat milk', 'coconut milk'],
    'egg': ['flax egg', 'chia egg', 'applesauce', 'banana'],
    'flour': ['almond flour', 'coconut flour', 'rice flour', 'oat flour'],
    'soy sauce': ['tamari', 'coconut aminos', 'worcestershire sauce'],
    'white wine': ['chicken broth', 'white grape juice', 'apple cider vinegar'],
    'heavy cream': ['coconut cream', 'cashew cream', 'milk with butter'],
    'parmesan': ['pecorino romano', 'nutritional yeast', 'asiago'],
    'chicken broth': ['vegetable broth', 'beef broth', 'bouillon cube'],
    'lemon': ['lime', 'white wine vinegar', 'apple cider vinegar'],
    'garlic': ['garlic powder', 'shallots', 'onion'],
    'onion': ['shallots', 'leeks', 'garlic'],
    'basil': ['oregano', 'thyme', 'parsley'],
    'olive oil': ['vegetable oil', 'canola oil', 'avocado oil'],
    'sugar': ['honey', 'maple syrup', 'agave nectar', 'stevia'],
    'beef': ['ground turkey', 'ground chicken', 'plant-based meat'],
    'chicken': ['turkey', 'tofu', 'tempeh', 'seitan'],
    'shrimp': ['chicken', 'scallops', 'firm white fish'],
    'mozzarella': ['provolone', 'fontina', 'monterey jack'],
    'cilantro': ['parsley', 'basil', 'mint'],
    'ginger': ['galangal', 'allspice', 'cardamom']
  };

  return substitutionMap[ingredient.toLowerCase()] || [];
}

/**
 * Adjust recipe servings
 */
export function adjustServings(recipe, newServings) {
  const multiplier = newServings / recipe.servings;
  
  return {
    ...recipe,
    servings: newServings,
    nutrition: {
      calories: Math.round(recipe.nutrition.calories * multiplier),
      protein: Math.round(recipe.nutrition.protein * multiplier),
      carbs: Math.round(recipe.nutrition.carbs * multiplier),
      fat: Math.round(recipe.nutrition.fat * multiplier),
      fiber: Math.round(recipe.nutrition.fiber * multiplier)
    }
  };
}

/**
 * Get personalized recipe recommendations based on user preferences and ratings
 */
export function getPersonalizedRecommendations(recipes, userRatings, userPreferences = {}) {
  // Filter by dietary preferences
  let filtered = recipes;
  
  if (userPreferences.dietary && userPreferences.dietary.length > 0) {
    filtered = filtered.filter(recipe => 
      userPreferences.dietary.some(diet => recipe.dietary.includes(diet))
    );
  }

  // Calculate recommendation score
  const scored = filtered.map(recipe => {
    let score = 0;
    
    // Factor 1: User's past ratings (40% weight)
    if (userRatings[recipe.id]) {
      score += userRatings[recipe.id] * 8;
    }
    
    // Factor 2: Overall recipe rating (30% weight)
    if (recipe.ratingCount > 0) {
      score += recipe.rating * 6;
    }
    
    // Factor 3: Cuisine preference (20% weight)
    if (userPreferences.favoriteCuisine && recipe.cuisine === userPreferences.favoriteCuisine) {
      score += 20;
    }
    
    // Factor 4: Difficulty preference (10% weight)
    if (userPreferences.difficulty) {
      if (recipe.difficulty === userPreferences.difficulty) {
        score += 10;
      }
    } else {
      // Default to preferring easier recipes
      if (recipe.difficulty === 'Easy') score += 10;
      else if (recipe.difficulty === 'Medium') score += 5;
    }
    
    return { ...recipe, recommendationScore: score };
  });

  // Sort by recommendation score
  scored.sort((a, b) => b.recommendationScore - a.recommendationScore);
  
  return scored;
}
