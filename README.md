# Johir Uddin Khan Portfolio Website

This is a static portfolio website prepared for GitHub Pages.

## Files you need to know

- `index.html` → all portfolio content and section structure
- `styles.css` → colors, layout, animations, responsive design
- `script.js` → mobile menu, reveal animation, active section highlight
- `assets/` → images, figures, screenshots, and CV file
- `.nojekyll` → helps GitHub Pages serve the site as plain static files

## Quickest way to publish on GitHub Pages

### Option A — Best and cleanest URL
Create a new repository named:

`username.github.io`

For your account, that would be:

`sajib-johir.github.io`

Then upload all files from this folder into that repository.

Your site URL will become:

`https://sajib-johir.github.io`

### Option B — Normal project repository
Create a repository like:

`portfolio`

Then upload all files into that repository.

After that:
1. Open the repository on GitHub
2. Go to **Settings**
3. Open **Pages**
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Save

Your site URL will look like:

`https://sajib-johir.github.io/portfolio/`

## Local testing

Open `index.html` in your browser to preview the site.

## Easy edits later

### Edit your text
Open `index.html`

### Change colors
Open `styles.css` and edit the `:root` color variables

### Add a new project
Duplicate one `project-card` block inside the `#projects` section

### Add a new paper
Duplicate one `publication-item` block inside the `#publications` section

### Replace IELTS / TOEFL placeholder
Find the `#scores` section in `index.html`

## Suggested next step

After publishing, update:
- custom domain later if needed
- final IELTS or TOEFL score
- more GitHub projects as they grow
