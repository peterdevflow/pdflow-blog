# PDFlow Blog

A modern, multilingual blog built with Next.js 16, featuring automatic language detection, internationalization, and a clean design.

## Features

- **Multilingual Support**: Automatic language detection based on browser preferences with support for Hungarian (default) and English
- **Internationalization**: Full i18n support using next-intl for seamless language switching
- **Modern UI**: Clean design with shadcn/ui components, Tailwind CSS, and dark/light mode support
- **Blog Functionality**: MDX-powered blog posts with reading time estimation and RSS feed
- **Performance Optimized**: Built with Next.js 16 and Turbopack for fast development and production builds
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first design that works on all devices

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Internationalization

This blog supports multiple languages with automatic detection and redirects:

- **Hungarian (hu)**: Default language, accessible via `/hu` prefix
- **English (en)**: Accessible via `/en` prefix

### Language Detection and Redirects

The blog automatically redirects non-locale URLs to the default locale:

- `/about` → `/hu/about` (Hungarian about page)
- `/blog` → `/hu/blog` (Hungarian blog page)
- `/contact` → `/hu/contact` (Hungarian contact page)
- `/blog/:slug` → `/hu/blog/:slug` (Hungarian blog posts)

### URL Structure

All URLs include locale prefixes for consistent routing:

- `/` - Redirects to `/hu` (Hungarian home page)
- `/hu` - Hungarian home page
- `/hu/about` - Hungarian about page
- `/hu/contact` - Hungarian contact page
- `/hu/blog` - Hungarian blog page
- `/en` - English home page
- `/en/about` - English about page
- `/en/contact` - English contact page
- `/en/blog` - English blog page

### Adding New Languages

To add a new language:

1. Add the language code to `src/i18n/request.ts`
2. Create translation files in `src/messages/[locale].json`
3. Update the language switcher component if needed

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── i18n/                 # Internationalization config
├── messages/             # Translation files
└── lib/                  # Utility functions
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **Content**: MDX for blog posts
- **Fonts**: Geist font family
- **Icons**: Lucide React

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed on Vercel, Netlify, or any platform supporting Next.js.

For Vercel deployment:

```bash
npm run build
```

The build output is optimized for static generation where possible, with server-side rendering for dynamic content.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
