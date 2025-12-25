# Amjad — Portfolio (React + Vite)

A modern, fast, and accessible personal website for showcasing my work in **Data Science** and **Web Development**.  
Built with React (Vite), elegant theming, smooth micro‑interactions, and a couple of interactive data demos.

## Live sections
- Sticky header with theme launcher
- Hero with my logo/portrait
- Selected Projects
- **Data Science playground** (K‑Means / DBSCAN)
- **Image Color Clustering** tool (K‑means palette reduction)
- Education
- Experience (animated timeline)
- Skills (tag chips)
- Compact Contact + social links
- Footer

## ✨ Features

### Design & UX
- Theme system: **Light**, **Dark**, **Pistachio** (optimistic green), **Color‑Safe** (high contrast & focus rings)
- Theme persists via `localStorage`; quick switcher on the page
- Responsive layout for phones, tablets, and desktop
- Subtle particles, tilt, and reveal‑on‑scroll animations (reduced when user prefers reduced motion)
- Clean typography, generous spacing, consistent radii and shadows

### Interactive Demos
**Data Science Playground**
- Models: **K‑Means (animated)** and **DBSCAN**
- Constant sample size (**20,000 points**) with stable canvas size—no layout jumps
- K slider (K‑Means), ε/minPts sliders (DBSCAN), SSE metric, and tooltips that explain cluster assignment
- “Reset data” uses a seeded RNG—dataset stays fixed otherwise

**Image Color Clustering**
- Upload an image (or use the sample) and choose **K** to reduce colors with K‑Means
- Shows Original vs. Quantized and lets you download the result (PNG)
- Fixed canvas sizes for a steady layout

### Accessibility
- Color‑Safe theme with stronger contrast and visible focus outlines
- Semantic HTML, labeled controls, keyboard‑navigable menus
- Underlines for links in the accessible theme

## 🧰 Tech Stack
- React (Vite)
- Vanilla CSS with CSS variables
- Small, dependency‑free JS for particles, tilt, and animations
- No heavyweight UI library — fast initial load

## 🧪 Data Demos (Details)

### 1) Clustering Playground (`DataScience.jsx`)
- Fixed logical space **820×340** and fixed CSS height (**340px**) so the section never resizes
- **K‑Means**: animated assign/update; K slider; SSE metric; point tooltips for nearest‑centroid reasoning
- **DBSCAN**: ε and minPts sliders; clusters vs. noise; tooltips explain core/border/noise
- Dataset: exactly **20,000 points** (3 blobs + noise), regenerated only on **Reset data**
- Performance: tiny rect drawing + ~30 fps throttle

### 2) Image Color Clustering (`ImagePalette.jsx`)
- Upload any image (or use `public/me.jpg`), choose **K** (3–16), preview quantized version, **Download PNG**
- Useful for stylized thumbnails or compressing colors

## 📦 Deploy
**GitHub Pages**
1) `npm run build`  
2) Deploy `dist/` (Pages or gh‑pages workflow)

**Any static host**: upload `dist/` to Netlify, Vercel, Cloudflare Pages, S3+CloudFront, etc.

## 🖊 License
Copyright © Amjad Hwidy.
You may read and learn from the code. To use the design as your own site, please request permission or replace branding and content.

---

**Built with ❤️ using React + Vite.** 

**Micro-interactions: custom particles, tilt, and scroll-reveal (no heavy libraries).**

**Thanks to colleagues and friends who gave feedback on design and readability.**


```
npm install
npm run build

git add .
git commit -m "Setup GitHub Pages deploy"
git push origin main

```