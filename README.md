# 🍳 Smart Recipe Generator

An intelligent web application that suggests recipes based on available ingredients, with support for image-based ingredient recognition, dietary restrictions, and personalized recommendations.

## 🌟 Features

### Core Functionality
- **📸 Image Recognition**: Upload photos of your ingredients for automatic detection
- **🔍 Smart Recipe Matching**: Advanced algorithm matches recipes based on your ingredients
- **💡 Ingredient Substitutions**: Get suggestions for ingredient alternatives
- **🎯 Personalized Recommendations**: AI-powered suggestions based on your ratings and preferences

### User Features
- **❤️ Favorites System**: Save your favorite recipes for quick access
- **⭐ Rating System**: Rate recipes to improve recommendations
- **🍽️ Serving Adjustments**: Dynamically adjust recipe servings and nutrition info
- **📊 Nutritional Information**: Complete nutritional breakdown for each recipe
- **🏷️ Dietary Filters**: Filter by vegetarian, vegan, gluten-free, and keto options

### Filters & Customization
- Filter by difficulty level (Easy, Medium, Hard)
- Filter by maximum cooking time
- Filter by cuisine type (Italian, Asian, Mexican, etc.)
- Filter by maximum calories
- Filter by multiple dietary restrictions
- Save dietary preferences for automatic filtering

## 🚀 Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables
- **Data Storage**: LocalStorage for user preferences and favorites
- **Image Processing**: Custom image recognition simulation (FileReader API)

## 📋 Project Structure

```
smart-recipe-generator/
├── src/
│   ├── data/
│   │   └── recipes.js          # Recipe database (22 recipes)
│   ├── utils/
│   │   ├── imageRecognition.js # Image processing utilities
│   │   ├── recipeMatching.js   # Recipe matching algorithm
│   │   └── storage.js          # LocalStorage management
│   ├── app.js                  # Main application logic
│   ├── helpers.js              # Helper functions
│   ├── modal.js                # Modal and utilities
│   ├── main-new.js             # Entry point
│   └── new-style.css           # Styling
├── index.html                   # HTML template
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-recipe-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 💻 Usage

### Finding Recipes

1. **Add Ingredients**:
   - Type ingredient names in the text input
   - Use autocomplete suggestions
   - Or upload a photo of your ingredients

2. **Apply Filters** (optional):
   - Set difficulty level
   - Set maximum cooking time
   - Choose cuisine preference
   - Select dietary restrictions

3. **Search**:
   - Click "Search Recipes" to find matches
   - Recipes are ranked by match percentage
   - View missing ingredients for each recipe

### Viewing Recipe Details

- Click any recipe card to open detailed view
- See complete ingredient list with substitution suggestions
- Follow step-by-step cooking instructions
- View nutritional information per serving
- Adjust serving sizes dynamically

### Managing Favorites

- Click the heart button to add/remove favorites
- Access all favorites from the Favorites tab
- Favorites are saved locally in your browser

### Rating Recipes

- Rate recipes from 1-5 stars in the detail modal
- Your ratings improve personalized recommendations
- View your past ratings on recipe cards

### Preferences

- Set dietary preferences (vegetarian, vegan, gluten-free, keto)
- Choose favorite cuisine
- Select preferred difficulty level
- Preferences are automatically applied to searches

## 🧠 Technical Approach

### Ingredient Recognition

The image recognition system uses a multi-strategy approach:

1. **Filename Analysis**: Checks image filenames for ingredient keywords
2. **Simulated ML Detection**: Randomly selects common ingredients to simulate AI detection
3. **Context-Based Enhancement**: Favors vegetables/produce based on filename keywords

In a production environment, this would be replaced with:
- Google Cloud Vision API
- AWS Rekognition
- Custom TensorFlow.js model
- Azure Computer Vision

### Recipe Matching Algorithm

The matching algorithm calculates a score (0-100) based on:

1. **Ingredient Match Percentage**: How many recipe ingredients are available
2. **Essential Ingredient Bonus**: Extra weight for matching first 5 ingredients
3. **Filter Application**: Applies user-selected filters
4. **Sorting**: Ranks recipes by match score

### Personalized Recommendations

Recommendations use a weighted scoring system:

- **User Ratings** (40%): Your past ratings for recipes
- **Overall Recipe Rating** (30%): Average ratings from all users
- **Cuisine Preference** (20%): Matches your favorite cuisine
- **Difficulty Preference** (10%): Matches your preferred difficulty level

### Error Handling

- Image file validation (type, size)
- Graceful fallbacks for failed operations
- User-friendly error messages
- Loading states for async operations

### Data Persistence

- LocalStorage for all user data
- Automatic save on preference changes
- Data survives page refreshes
- No backend required

## 📊 Recipe Database

The application includes **22 diverse recipes** covering:

- **Cuisines**: Italian, Asian, American, Mexican, Mediterranean, Indian, Thai, Japanese, Greek, Middle Eastern, Fusion
- **Dietary Options**: Vegetarian (9), Vegan (4), Gluten-Free (11), Keto (2)
- **Difficulty Levels**: Easy (15), Medium (6), Hard (1)
- **Cooking Times**: 10-45 minutes

Each recipe includes:
- Complete ingredient list
- Step-by-step instructions
- Nutritional information (calories, protein, carbs, fat, fiber)
- Dietary tags
- Cuisine classification
- Difficulty rating
- Cooking time
- Servings

## 🎨 UI/UX Considerations

- **Mobile-First Design**: Fully responsive on all devices
- **Intuitive Navigation**: Tab-based interface for easy switching
- **Visual Feedback**: Loading states, animations, and transitions
- **Accessibility**: Semantic HTML, proper ARIA labels
- **Color System**: CSS variables for consistent theming
- **Performance**: Optimized rendering and minimal re-renders

## 🚀 Deployment

### Recommended Platforms

1. **Netlify** (Easiest)
   ```bash
   # Connect GitHub repo or use Netlify CLI
   netlify deploy --prod
   ```

2. **Vercel**
   ```bash
   # Connect GitHub repo or use Vercel CLI
   vercel --prod
   ```

3. **GitHub Pages**
   ```bash
   npm run build
   # Deploy the dist/ folder
   ```

### Build Configuration

The app uses Vite which provides:
- Hot Module Replacement (HMR)
- Optimized production builds
- Code splitting
- Asset optimization
- Modern ES6+ support

## 🔮 Future Enhancements

- Real ML-based image recognition
- User accounts with cloud sync
- Recipe sharing and community ratings
- Shopping list generation
- Meal planning features
- Integration with grocery delivery APIs
- Nutritional tracking
- Video cooking tutorials
- Print recipe formatting

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Created as a demonstration of modern web development practices with vanilla JavaScript.

---

**Live Demo**: [Deploy your own!]

**GitHub**: [Your Repository URL]

Built with ❤️ and 🍕
