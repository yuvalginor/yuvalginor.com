# Personal Website

A clean, minimalist one-page personal website built with Astro and deployed on Netlify.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Customization

### Update Your Information

Edit `src/pages/index.astro` and update:

- `name`: Your full name
- `title`: Your title/tagline
- `profileImage`: Path to your profile image (place it in `public/`)
- `socialLinks`: Your social media profiles
- Content sections: Update the paragraphs with your own information

### Add Your Profile Picture

1. Add your profile image to the `public/` folder (e.g., `public/profile.jpg`)
2. Update the `profileImage` variable in `index.astro`

### Styling

The main styles are in `public/styles/global.css`. You can customize:

- Colors: Update CSS variables in `:root`
- Typography: Modify font families and sizes
- Layout: Adjust spacing and max-width

## Building

Build for production:

```bash
npm run build
```

The output will be in the `dist/` folder.

## Deploying to Netlify

### Option 1: Git Integration (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Manual Deploy

1. Build the site: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Custom Domain

After deploying, you can add a custom domain in your Netlify site settings under "Domain management".

## Project Structure

```
├── public/
│   ├── styles/
│   │   └── global.css      # Main stylesheet
│   └── favicon.svg         # Site favicon
├── src/
│   └── pages/
│       └── index.astro     # Main page
├── astro.config.mjs        # Astro configuration
├── netlify.toml            # Netlify configuration
├── package.json
└── README.md
```

## License

MIT


