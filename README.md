# 2026-gstp

**Live demo** https://unctad-infovis.github.io/2026-gstp/

## About

The Global System of Trade Preferences (GSTP) is a preferential trade agreement among 42 developing countries, administered by UNCTAD as its Secretariat. This project is a minisite introducing the GSTP: what it is, why it matters, its historic milestones, and the key figures behind its economic impact — including the potential welfare gains from the São Paulo Round, one ratification away from entering into force.

Content is authored in MDX and rendered as a standalone React application embeddable within UNCTAD's Drupal platform. The page combines a photo header with key statistics, a two-column narrative section, an animated historic timeline, and tiled key-figure rows.

## Embedding

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-gstp/js/2026-gstp.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-gstp/css/2026-gstp.min.css?v=1">
<div class="app-root-2026-gstp" id="app-root-2026-gstp">
  Loading...
</div>
```

Update the `?v=` query parameter to match the current build version to bust the cache.

## Rights of usage

Contact Teemo Tebest.

## How to build and develop

This is a Vite + React project.

* `npm run install`
* `npm run start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`

## Files and folders

All public assets go to folder `public`.

All source code goes to folder `src`.

## Packages

The following packages are used in this project by default.

### Project specific

* none

### Build & Dev Server

* **vite** — development server with hot module replacement and production bundler, replaces webpack
* **@vitejs/plugin-react** — adds React and JSX support to Vite

### React

* **react** — UI component library
* **react-dom** — renders React components to the DOM

### Formatter & Linter

* **@biomejs/biome** — formats and lints JS, JSX and CSS files on save, replaces ESLint + Prettier

### Minification

* **terser** — minifies the production JavaScript bundle, removes console.logs in production builds

### MDX

* **@mdx-js/rollup** — Vite/Rollup plugin that compiles MDX files into React components
* **@mdx-js/react** — provides React context for MDX components