# 🚀 Deployment Guide - Smart Recipe Generator

## Quick Deployment to Vercel (Recommended)

### Method 1: Using Vercel UI (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Smart Recipe Generator"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [https://vercel.com/](https://vercel.com/)
   - Click "Add New Project"
   - Import your GitHub repository
   - Build settings will be auto-detected from `vercel.json`:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click "Deploy"

3. **Done!** 
   - Your app will be live at `https://your-project.vercel.app`
   - Vercel provides automatic HTTPS
   - Every push to main branch auto-deploys

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Build the project
npm run build

# Deploy to Vercel
vercel --prod

# Follow the prompts to create a new site or deploy to existing
```

## Deploy to Vercel

### Using Vercel UI (Alternative Method)

1. **Push to GitHub** (same as above)

2. **Deploy on Vercel**
   - Go to [https://vercel.com/](https://vercel.com/)
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework will be auto-detected as Vite
   - Click "Deploy"

3. **Done!**
   - Your app will be live at `https://your-project.vercel.app`

### Using Vercel CLI (Alternative Method)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## Deploy to Netlify (Alternative)

### Using Netlify UI

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Done!**
   - Your app will be live at `https://your-site-name.netlify.app`

## Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.js**
   Create if it doesn't exist:
   ```javascript
   import { defineConfig } from 'vite'
   
   export default defineConfig({
     base: '/smart-recipe-generator/', // Replace with your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

6. **Access**
   - Your app will be at `https://username.github.io/smart-recipe-generator/`

## Deploy to Other Platforms

### Render

1. Go to [https://render.com/](https://render.com/)
2. Click "New Static Site"
3. Connect GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

### Cloudflare Pages

1. Go to [https://pages.cloudflare.com/](https://pages.cloudflare.com/)
2. Connect GitHub
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy

## Testing Before Deployment

```bash
# Build the production version
npm run build

# Preview the production build locally
npm run preview
```

This will start a local server to test the built application before deploying.

## Environment Variables

This application doesn't require any environment variables for basic functionality. However, if you add features like:

- **API integrations** (Google Vision, AWS Rekognition)
- **Analytics** (Google Analytics, Mixpanel)
- **Backend services**

You can add them in your hosting platform:

**Vercel**: Project settings → Environment Variables

**Netlify**: Site settings → Environment variables

**GitHub Pages**: Use GitHub Secrets

## Custom Domain Setup

### Vercel
1. Go to Project settings → Domains
2. Add your custom domain
3. Configure DNS records

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## Performance Optimization

The build process automatically:
- ✅ Minifies JavaScript and CSS
- ✅ Optimizes images
- ✅ Creates chunks for code splitting
- ✅ Generates source maps
- ✅ Sets up caching headers

## Monitoring

After deployment, monitor your site:

- **Vercel Analytics**: Speed insights and web vitals
- **Netlify Analytics**: Built-in analytics
- **Google Analytics**: Add tracking code in `index.html`

## Troubleshooting

### Build Fails
- Check Node version (use Node 16+)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Routes Not Working (404 errors)
- Ensure redirects are configured (already done in `vercel.json`)
- For Netlify, create `netlify.toml`:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

### Images Not Loading
- Check image paths are correct
- Ensure images are in `public` folder or imported in JS

## Post-Deployment Checklist

- [ ] Test all features on live site
- [ ] Check mobile responsiveness
- [ ] Test image upload functionality
- [ ] Verify localStorage works
- [ ] Test all tabs and navigation
- [ ] Check recipe search and filters
- [ ] Test favorites and ratings
- [ ] Verify modal functionality
- [ ] Test on different browsers
- [ ] Update README with live URL
- [ ] Share your project! 🎉

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:

- **Main branch**: Automatically deploys to production
- **Pull requests**: Create preview deployments
- **Branches**: Can have separate preview URLs

This is already configured when you connect your GitHub repository!

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com/
- Vite Docs: https://vitejs.dev/guide/static-deploy.html
