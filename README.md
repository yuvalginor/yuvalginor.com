# Personal Website

My personal website built with Astro and Tailwind CSS, deployed on Netlify.

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:4321` to view the site.

## Building

Create a production build:

```bash
npm run build
```

The build output is generated in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This site is configured for deployment on Netlify. The build configuration is specified in `netlify.toml`.

### Automatic Deployment

Connect your Git repository to Netlify for automatic deployments on every push to the main branch.

### Manual Deployment

Build the site locally and deploy the `dist/` directory through the Netlify dashboard.

## Customization

### Content

Update personal information in `src/pages/index.astro`:
- Name and tagline
- Social media links
- Bio sections

### Styling

The color palette and typography are defined in `src/styles/global.css`. The site uses Tailwind CSS for utility-first styling.

### Theme

The site includes a light/dark mode toggle that respects system preferences and persists user choice in localStorage.

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS 4 (with Vite plugin)
- **Typography**: Tailwind Typography plugin
- **Deployment**: Netlify

## License

MIT
