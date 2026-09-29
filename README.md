# Vértice Racing

A responsive, six-page motorsport website for a fictional Brazilian racing team. Designed in Figma and built with HTML, CSS and vanilla JavaScript, the project combines bold typography, concept imagery and scroll-driven motion. All website content is in English.

## Pages

| Page | Route | Content |
| --- | --- | --- |
| Home | `index.html` | Team introduction, car specifications, drivers and upcoming rounds |
| Team | `equipe.html` | Origins, timeline and team values |
| Car | `carro.html` | VR–01 concept, technical specifications and development approach |
| Drivers | `pilotos.html` | Lucas Andrade and Maya Costa: portraits and biographies |
| Season | `temporada.html` | Fictional calendar, results and driver performance |
| Gallery | `galeria.html` | On-track moments, pit stops and team celebrations |

The original route names are retained so existing links continue to work. Driver profiles can be linked directly with `pilotos.html#lucas` and `pilotos.html#maya`.

## Features

- Responsive layouts and a mobile navigation menu.
- Smooth wheel scrolling, section reveals, subtle image parallax and animated performance bars.
- A reading progress indicator and an animated car transition between pages.
- Local images and self-hosted Barlow and Barlow Condensed fonts.
- Semantic HTML, descriptive image alternatives, a skip link and active-page navigation labels.
- Support for the system's `prefers-reduced-motion` setting. There is no separate animation pause control.
- Content and navigation remain available without JavaScript.

## Run locally

The ready-to-serve website is in `dist/`. From this project folder, run:

```sh
python -m http.server 4173 --directory dist
```

Open [localhost:4173](http://localhost:4173). On Windows, use `py` instead of `python` if needed.

After changing page content in `build.mjs`, regenerate the HTML with Node.js:

```sh
node build.mjs
```

No npm installation or runtime dependencies are required. Use a supported Node.js LTS release.

## Project structure

```text
build.mjs           Page templates, shared navigation and English content
vercel.json         Static deployment configuration
README.md           Project documentation
dist/
  *.html            Six generated pages
  styles.css        Shared styles and responsive layouts
  app.js            Navigation, scrolling and animation behavior
  assets/           Images, SVGs, fonts and font licenses
```

Edit `build.mjs` for page content, `dist/styles.css` for styles and `dist/app.js` for interactions. Changes made directly to generated HTML are overwritten by the next build. The build only regenerates HTML: keep the CSS, JavaScript and assets in `dist/` under version control.

## Update GitHub

If using the ZIP delivery, extract it first. Upload its contents to the repository root so `build.mjs`, `vercel.json`, `README.md` and the `dist/` folder sit together. Preserve the folder structure and replace the corresponding existing files. Do not upload the ZIP itself or nest the whole project inside another folder.

For an existing local Git clone, copy the updated project files into it, review the changes, then run:

```sh
git status
git add build.mjs vercel.json README.md dist
git commit -m "Translate website and documentation into English"
git push
```

Do not upload local tooling folders such as `.openai/`, `.sites-runtime/` or `node_modules/`.

## Deploy on Vercel

Import the GitHub repository into Vercel, or use the existing connected project. With these files at the repository root, `vercel.json` sets:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Build command | `node build.mjs` |
| Output directory | `dist` |
| Install command | None |

Use the repository root as the Root Directory. If the site is intentionally stored in a subfolder, select that folder instead. No environment variables are required.

For an existing Git integration, committing to the configured production branch (usually `main`) triggers a new production deployment. Check the latest deployment in Vercel, wait for **Ready**, then open the production URL to verify the changes. If automatic deployment is disabled, redeploy the latest commit from the Vercel dashboard.

If the root URL returns 404, confirm that `dist/index.html` exists, the Root Directory points to the folder containing `vercel.json`, and the Output Directory is `dist`.

## Concept and assets

Vértice Racing, its drivers, biographies, calendar, results and technical specifications are fictional. The results are static demonstration data, not a live racing feed. Photography, including driver portraits, is AI-generated and does not represent real team members. Power is expressed in PS (metric horsepower); other specifications use metric units.

This is a frontend portfolio project. It has no backend, registration system or real betting functionality. Calls to action navigate to other pages within the website.

Font license notices are included in `dist/assets/`. Keep them with any redistributed font files.
