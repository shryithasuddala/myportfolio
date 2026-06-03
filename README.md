# Shryitha Suddala – Portfolio Website

## Getting Started

1. **Add your profile picture**
   - Place your photo as `assets/images/profile.jpg`
   - Recommended size: 400×400px or larger, square crop
   - If no image is provided, a styled "SS" placeholder will be shown automatically

2. **Add your CV/Resume**
   - Place your resume as `assets/Shryitha_Resume.pdf`
   - The "Download CV" button on the homepage will trigger this download

3. **Update social media links**
   - Open `index.html` and search for the social icon links
   - Update the WhatsApp number, LinkedIn URL, GitHub URL, and LeetCode URL

4. **Update certificate links**
   - In `index.html`, find each `<a href="#">` in the Certifications section
   - Replace `#` with your actual certificate URLs (Google Drive, Credly, etc.)

5. **Update GitHub links on projects**
   - In `index.html`, find each project card's GitHub link
   - Replace with your actual GitHub repository URLs

6. **Open the website**
   - Simply open `index.html` in any modern browser
   - No build tools or server needed!

## Deploying to Vercel (like the reference portfolio)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" → Import your GitHub repo
4. Click Deploy — that's it!

## File Structure

```
shryitha-portfolio/
├── index.html        ← Main HTML file (all sections)
├── style.css         ← All styles
├── script.js         ← Animations & interactions
├── assets/
│   ├── Shryitha_Resume.pdf   ← Your CV (add this!)
│   └── images/
│       └── profile.jpg       ← Your photo (add this!)
└── README.md
```

## Customization Tips

- **Colors**: Edit CSS variables at the top of `style.css` under `:root {}`
- **Fonts**: Change the Google Fonts import in `index.html` `<head>`
- **Typed phrases**: Edit the `phrases` array in `script.js`
- **Section order**: Rearrange the `<section>` blocks in `index.html`
