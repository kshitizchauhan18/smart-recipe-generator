// Recipe Database with 20+ recipes
export const recipes = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    ingredients: ["flour", "tomato", "mozzarella", "basil", "olive oil", "yeast", "salt"],
    steps: [
      "Mix flour, yeast, salt, and water to make dough",
      "Let dough rise for 1 hour",
      "Roll out dough into pizza shape",
      "Spread tomato sauce on dough",
      "Add mozzarella cheese",
      "Bake at 450°F for 12-15 minutes",
      "Garnish with fresh basil and olive oil"
    ],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 10,
      fiber: 2
    },
    dietary: ["vegetarian"],
    image: "🍕",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 2,
    name: "Chicken Stir Fry",
    cuisine: "Asian",
    difficulty: "Easy",
    cookingTime: 20,
    servings: 4,
    ingredients: ["chicken", "bell pepper", "onion", "soy sauce", "garlic", "ginger", "rice", "vegetable oil"],
    steps: [
      "Cut chicken into bite-sized pieces",
      "Heat oil in wok or large pan",
      "Stir fry chicken until cooked through",
      "Add vegetables and cook for 3-4 minutes",
      "Add soy sauce, garlic, and ginger",
      "Serve over cooked rice"
    ],
    nutrition: {
      calories: 320,
      protein: 28,
      carbs: 35,
      fat: 8,
      fiber: 3
    },
    dietary: [],
    image: "🍜",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 3,
    name: "Caesar Salad",
    cuisine: "American",
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    ingredients: ["lettuce", "parmesan", "croutons", "lemon", "garlic", "olive oil", "egg", "anchovy"],
    steps: [
      "Wash and chop romaine lettuce",
      "Make dressing: blend garlic, lemon juice, egg, anchovies, and olive oil",
      "Toss lettuce with dressing",
      "Add parmesan cheese and croutons",
      "Serve immediately"
    ],
    nutrition: {
      calories: 220,
      protein: 8,
      carbs: 12,
      fat: 16,
      fiber: 2
    },
    dietary: [],
    image: "🥗",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 4,
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    difficulty: "Medium",
    cookingTime: 25,
    servings: 4,
    ingredients: ["spaghetti", "bacon", "egg", "parmesan", "black pepper", "salt"],
    steps: [
      "Cook spaghetti according to package directions",
      "Fry bacon until crispy",
      "Beat eggs with parmesan and pepper",
      "Drain pasta, reserving 1 cup pasta water",
      "Mix hot pasta with bacon and egg mixture",
      "Add pasta water to create creamy sauce",
      "Serve with extra parmesan"
    ],
    nutrition: {
      calories: 450,
      protein: 20,
      carbs: 52,
      fat: 18,
      fiber: 2
    },
    dietary: [],
    image: "🍝",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 5,
    name: "Vegetable Curry",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: 40,
    servings: 6,
    ingredients: ["potato", "carrot", "peas", "onion", "tomato", "coconut milk", "curry powder", "garlic", "ginger", "rice"],
    steps: [
      "Sauté onions, garlic, and ginger",
      "Add curry powder and cook for 1 minute",
      "Add chopped vegetables",
      "Pour in coconut milk and simmer for 25 minutes",
      "Season with salt",
      "Serve over rice"
    ],
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 45,
      fat: 9,
      fiber: 6
    },
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: "🍛",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 6,
    name: "Grilled Salmon with Asparagus",
    cuisine: "American",
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    ingredients: ["salmon", "asparagus", "lemon", "olive oil", "garlic", "salt", "black pepper"],
    steps: [
      "Preheat grill to medium-high",
      "Brush salmon with olive oil and season",
      "Toss asparagus with oil, garlic, salt, and pepper",
      "Grill salmon for 4-5 minutes per side",
      "Grill asparagus for 8-10 minutes",
      "Serve with lemon wedges"
    ],
    nutrition: {
      calories: 340,
      protein: 34,
      carbs: 8,
      fat: 20,
      fiber: 4
    },
    dietary: ["gluten-free", "keto"],
    image: "🐟",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 7,
    name: "Beef Tacos",
    cuisine: "Mexican",
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    ingredients: ["ground beef", "taco shells", "lettuce", "tomato", "cheese", "onion", "sour cream", "taco seasoning"],
    steps: [
      "Brown ground beef in a pan",
      "Add taco seasoning and water, simmer",
      "Warm taco shells in oven",
      "Chop lettuce, tomatoes, and onions",
      "Assemble tacos with meat and toppings",
      "Serve with sour cream"
    ],
    nutrition: {
      calories: 380,
      protein: 22,
      carbs: 28,
      fat: 20,
      fiber: 4
    },
    dietary: [],
    image: "🌮",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 8,
    name: "Greek Salad",
    cuisine: "Greek",
    difficulty: "Easy",
    cookingTime: 10,
    servings: 4,
    ingredients: ["cucumber", "tomato", "red onion", "feta cheese", "olives", "olive oil", "lemon", "oregano"],
    steps: [
      "Chop cucumber, tomatoes, and red onion",
      "Add olives and cubed feta cheese",
      "Drizzle with olive oil and lemon juice",
      "Sprinkle with oregano",
      "Toss gently and serve"
    ],
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 10,
      fat: 14,
      fiber: 3
    },
    dietary: ["vegetarian", "gluten-free"],
    image: "🥗",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 9,
    name: "Chicken Burrito Bowl",
    cuisine: "Mexican",
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    ingredients: ["chicken", "rice", "black beans", "corn", "bell pepper", "onion", "lime", "cilantro", "cheese", "sour cream"],
    steps: [
      "Cook rice according to package",
      "Season and cook chicken, then slice",
      "Sauté peppers and onions",
      "Warm black beans and corn",
      "Assemble bowls with rice, chicken, beans, corn, and vegetables",
      "Top with cheese, sour cream, cilantro, and lime"
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 48,
      fat: 12,
      fiber: 8
    },
    dietary: ["gluten-free"],
    image: "🥙",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 10,
    name: "Mushroom Risotto",
    cuisine: "Italian",
    difficulty: "Hard",
    cookingTime: 45,
    servings: 4,
    ingredients: ["arborio rice", "mushroom", "onion", "white wine", "parmesan", "butter", "chicken broth", "garlic"],
    steps: [
      "Sauté mushrooms and set aside",
      "In same pan, cook onion and garlic",
      "Add rice and toast for 2 minutes",
      "Add wine and stir until absorbed",
      "Add broth one ladle at a time, stirring constantly",
      "Stir in mushrooms, butter, and parmesan",
      "Serve immediately"
    ],
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 58,
      fat: 11,
      fiber: 2
    },
    dietary: ["vegetarian", "gluten-free"],
    image: "🍚",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 11,
    name: "Pad Thai",
    cuisine: "Thai",
    difficulty: "Medium",
    cookingTime: 30,
    servings: 4,
    ingredients: ["rice noodles", "shrimp", "egg", "peanuts", "bean sprouts", "lime", "fish sauce", "tamarind", "garlic", "green onion"],
    steps: [
      "Soak rice noodles in warm water",
      "Make sauce with fish sauce, tamarind, and sugar",
      "Stir fry shrimp and set aside",
      "Scramble eggs in pan",
      "Add noodles and sauce, cook until absorbed",
      "Add shrimp, peanuts, and bean sprouts",
      "Serve with lime wedges and green onions"
    ],
    nutrition: {
      calories: 420,
      protein: 24,
      carbs: 52,
      fat: 14,
      fiber: 3
    },
    dietary: ["gluten-free"],
    image: "🍜",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 12,
    name: "Caprese Salad",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: 10,
    servings: 2,
    ingredients: ["tomato", "mozzarella", "basil", "olive oil", "balsamic vinegar", "salt", "black pepper"],
    steps: [
      "Slice tomatoes and mozzarella",
      "Arrange alternating slices on a plate",
      "Tuck fresh basil leaves between slices",
      "Drizzle with olive oil and balsamic vinegar",
      "Season with salt and pepper",
      "Serve immediately"
    ],
    nutrition: {
      calories: 240,
      protein: 14,
      carbs: 8,
      fat: 18,
      fiber: 2
    },
    dietary: ["vegetarian", "gluten-free"],
    image: "🧀",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 13,
    name: "Lentil Soup",
    cuisine: "Mediterranean",
    difficulty: "Easy",
    cookingTime: 40,
    servings: 6,
    ingredients: ["lentils", "carrot", "celery", "onion", "tomato", "garlic", "vegetable broth", "cumin", "olive oil"],
    steps: [
      "Sauté onion, carrot, and celery",
      "Add garlic and cumin, cook 1 minute",
      "Add lentils, tomatoes, and broth",
      "Simmer for 30 minutes until lentils are tender",
      "Season with salt and pepper",
      "Serve hot with crusty bread"
    ],
    nutrition: {
      calories: 210,
      protein: 12,
      carbs: 36,
      fat: 3,
      fiber: 14
    },
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: "🍲",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 14,
    name: "BBQ Chicken Pizza",
    cuisine: "American",
    difficulty: "Medium",
    cookingTime: 30,
    servings: 4,
    ingredients: ["pizza dough", "chicken", "bbq sauce", "mozzarella", "red onion", "cilantro", "olive oil"],
    steps: [
      "Preheat oven to 450°F",
      "Roll out pizza dough",
      "Spread BBQ sauce on dough",
      "Top with cooked chicken, cheese, and red onion",
      "Bake for 15-18 minutes",
      "Garnish with fresh cilantro",
      "Slice and serve"
    ],
    nutrition: {
      calories: 380,
      protein: 24,
      carbs: 42,
      fat: 12,
      fiber: 2
    },
    dietary: [],
    image: "🍕",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 15,
    name: "Quinoa Buddha Bowl",
    cuisine: "Fusion",
    difficulty: "Easy",
    cookingTime: 25,
    servings: 2,
    ingredients: ["quinoa", "chickpeas", "sweet potato", "kale", "avocado", "tahini", "lemon", "olive oil"],
    steps: [
      "Cook quinoa according to package",
      "Roast sweet potato cubes at 400°F for 20 minutes",
      "Roast chickpeas with olive oil and spices",
      "Massage kale with lemon and oil",
      "Assemble bowls with quinoa, sweet potato, chickpeas, and kale",
      "Top with avocado and tahini dressing"
    ],
    nutrition: {
      calories: 450,
      protein: 16,
      carbs: 62,
      fat: 18,
      fiber: 14
    },
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: "🥗",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 16,
    name: "Teriyaki Chicken",
    cuisine: "Japanese",
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    ingredients: ["chicken", "soy sauce", "mirin", "sake", "sugar", "ginger", "garlic", "rice", "green onion"],
    steps: [
      "Mix soy sauce, mirin, sake, and sugar for teriyaki sauce",
      "Cook chicken in pan until browned",
      "Add garlic and ginger",
      "Pour in teriyaki sauce and simmer until thickened",
      "Serve over rice",
      "Garnish with green onions"
    ],
    nutrition: {
      calories: 350,
      protein: 30,
      carbs: 42,
      fat: 6,
      fiber: 1
    },
    dietary: [],
    image: "🍗",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 17,
    name: "Tomato Basil Soup",
    cuisine: "American",
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    ingredients: ["tomato", "basil", "onion", "garlic", "vegetable broth", "cream", "olive oil", "salt", "black pepper"],
    steps: [
      "Sauté onion and garlic in olive oil",
      "Add tomatoes and broth",
      "Simmer for 20 minutes",
      "Blend until smooth",
      "Stir in cream and fresh basil",
      "Season with salt and pepper",
      "Serve hot with grilled cheese"
    ],
    nutrition: {
      calories: 160,
      protein: 4,
      carbs: 18,
      fat: 9,
      fiber: 4
    },
    dietary: ["vegetarian", "gluten-free"],
    image: "🍅",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 18,
    name: "Shrimp Scampi",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: 20,
    servings: 4,
    ingredients: ["shrimp", "pasta", "garlic", "white wine", "lemon", "butter", "parsley", "red pepper flakes"],
    steps: [
      "Cook pasta according to package",
      "Sauté garlic in butter",
      "Add shrimp and cook until pink",
      "Add white wine and lemon juice",
      "Toss with cooked pasta",
      "Garnish with parsley and red pepper flakes"
    ],
    nutrition: {
      calories: 420,
      protein: 28,
      carbs: 45,
      fat: 14,
      fiber: 2
    },
    dietary: [],
    image: "🍤",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 19,
    name: "Falafel Wrap",
    cuisine: "Middle Eastern",
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    ingredients: ["chickpeas", "pita bread", "tahini", "cucumber", "tomato", "lettuce", "onion", "parsley", "cumin", "garlic"],
    steps: [
      "Blend chickpeas, parsley, onion, garlic, and spices",
      "Form into small balls and refrigerate",
      "Fry falafel until golden brown",
      "Make tahini sauce with tahini, lemon, and garlic",
      "Warm pita bread",
      "Fill pita with falafel, vegetables, and tahini sauce"
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 52,
      fat: 14,
      fiber: 10
    },
    dietary: ["vegetarian", "vegan"],
    image: "🥙",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 20,
    name: "Beef Stir Fry with Broccoli",
    cuisine: "Asian",
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    ingredients: ["beef", "broccoli", "soy sauce", "garlic", "ginger", "oyster sauce", "rice", "sesame oil", "cornstarch"],
    steps: [
      "Marinate beef in soy sauce and cornstarch",
      "Blanch broccoli in boiling water",
      "Stir fry beef in hot oil until browned",
      "Add garlic and ginger",
      "Add broccoli and sauce",
      "Serve over rice"
    ],
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 38,
      fat: 12,
      fiber: 4
    },
    dietary: [],
    image: "🥦",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 21,
    name: "Veggie Quesadilla",
    cuisine: "Mexican",
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    ingredients: ["tortilla", "bell pepper", "onion", "cheese", "black beans", "corn", "cumin", "sour cream"],
    steps: [
      "Sauté peppers and onions",
      "Add black beans, corn, and cumin",
      "Place mixture on half of tortilla",
      "Top with cheese and fold",
      "Cook in pan until golden and cheese melts",
      "Serve with sour cream"
    ],
    nutrition: {
      calories: 340,
      protein: 14,
      carbs: 42,
      fat: 14,
      fiber: 8
    },
    dietary: ["vegetarian"],
    image: "🌯",
    rating: 0,
    ratingCount: 0
  },
  {
    id: 22,
    name: "Baked Cod with Lemon",
    cuisine: "Mediterranean",
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    ingredients: ["cod", "lemon", "garlic", "olive oil", "parsley", "white wine", "salt", "black pepper"],
    steps: [
      "Preheat oven to 400°F",
      "Place cod in baking dish",
      "Drizzle with olive oil and lemon juice",
      "Add minced garlic and white wine",
      "Bake for 15-18 minutes",
      "Garnish with fresh parsley"
    ],
    nutrition: {
      calories: 220,
      protein: 28,
      carbs: 3,
      fat: 10,
      fiber: 1
    },
    dietary: ["gluten-free", "keto"],
    image: "🐟",
    rating: 0,
    ratingCount: 0
  }
];

// Common ingredients list for autocomplete/selection
export const commonIngredients = [
  "chicken", "beef", "pork", "salmon", "shrimp", "cod", "tuna",
  "rice", "pasta", "spaghetti", "quinoa", "noodles", "bread", "tortilla", "pita bread",
  "tomato", "onion", "garlic", "bell pepper", "broccoli", "carrot", "lettuce", "cucumber",
  "potato", "sweet potato", "mushroom", "asparagus", "kale", "spinach", "celery",
  "cheese", "mozzarella", "parmesan", "feta cheese", "cheddar",
  "egg", "milk", "butter", "cream", "sour cream", "yogurt",
  "olive oil", "vegetable oil", "sesame oil", "coconut oil",
  "soy sauce", "fish sauce", "oyster sauce", "bbq sauce", "teriyaki sauce",
  "lemon", "lime", "basil", "cilantro", "parsley", "oregano",
  "salt", "black pepper", "cumin", "paprika", "curry powder", "red pepper flakes",
  "chickpeas", "black beans", "lentils", "beans", "peas",
  "ginger", "avocado", "olives", "peanuts", "tahini", "corn",
  "flour", "sugar", "yeast", "baking powder",
  "white wine", "red wine", "mirin", "sake",
  "chicken broth", "vegetable broth", "beef broth",
  "tamarind", "anchovy", "cornstarch"
].sort();
