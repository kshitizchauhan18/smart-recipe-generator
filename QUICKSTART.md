# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:5173
```

## 📱 How to Use

### Find Recipes

1. **Upload a photo** of your ingredients (optional)
   - Or type them manually using the autocomplete

2. **Apply filters** (optional)
   - Set difficulty, cooking time, cuisine, dietary restrictions

3. **Click "Search Recipes"**
   - See recipes ranked by match percentage

### View Recipe Details

- Click any recipe card to see:
  - Complete ingredient list
  - Step-by-step instructions
  - Nutritional information
  - Ingredient substitution suggestions

### Save Favorites

- Click the ❤️ button on any recipe
- Access them from the Favorites tab

### Rate Recipes

- Open recipe details
- Click stars to rate 1-5
- Your ratings improve recommendations

### Set Preferences

- Go to Preferences tab
- Set dietary needs
- Choose favorite cuisine
- Select preferred difficulty

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📤 Deploy

### Netlify (Recommended)

```bash
# Option 1: Using Netlify CLI
npm install -g netlify-cli
npm run build
netlify deploy --prod

# Option 2: Connect GitHub repo at netlify.com
```

### Vercel

```bash
# Option 1: Using Vercel CLI
npm install -g vercel
vercel --prod

# Option 2: Connect GitHub repo at vercel.com
```

## 📁 Project Structure

```
src/
  ├── data/
  │   └── recipes.js          # Recipe database
  ├── utils/
  │   ├── imageRecognition.js # Image processing
  │   ├── recipeMatching.js   # Recipe algorithm
  │   └── storage.js          # LocalStorage
  ├── app.js                  # Main app logic
  ├── helpers.js              # Helper functions
  ├── modal.js                # Modal & utilities
  ├── main-new.js             # Entry point
  └── new-style.css           # Styles
```

## 🎯 Key Features

✅ Image-based ingredient recognition
✅ Smart recipe matching algorithm
✅ 22+ diverse recipes
✅ Dietary filters (vegetarian, vegan, gluten-free, keto)
✅ Personalized recommendations
✅ Favorites & ratings
✅ Ingredient substitutions
✅ Serving size adjustments
✅ Complete nutritional info
✅ Mobile responsive design

## 🔧 Troubleshooting

**Port already in use?**
```bash
# Vite will automatically use next available port
# Or specify a different port:
npm run dev -- --port 3000
```

**Build fails?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Images not working?**
- Make sure you're using valid image formats (JPEG, PNG, WebP)
- File size must be under 10MB

## 📚 Documentation

- Full README: [README.md](./README.md)
- Technical Write-up: [TECHNICAL_WRITEUP.md](./TECHNICAL_WRITEUP.md)
- Deployment Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 💡 Tips

1. **Add ingredients gradually** - See recipe matches update in real-time
2. **Use filters** - Narrow down to exactly what you want
3. **Rate recipes** - Get better personalized recommendations
4. **Check substitutions** - Don't have an ingredient? See alternatives
5. **Adjust servings** - Nutrition info updates automatically

## 🎨 Customization

Want to change the theme? Edit CSS variables in `src/new-style.css`:

```css
:root {
  --primary: #ff6b6b;      /* Main color */
  --secondary: #4ecdc4;    /* Accent color */
  --accent: #ffe66d;       /* Highlight color */
  /* ... */
}
```

## 🐛 Found an Issue?

Create an issue on GitHub with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 🎉 Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Netlify, Vercel, or GitHub Pages.

---

**Happy Cooking! 🍳**
