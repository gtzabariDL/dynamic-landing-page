# Dynamic Landing Page

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 22.16.0 or higher
- **pnpm**: 9.6.0 or higher

> **Note**: This project uses pnpm as the package manager. npm and yarn are explicitly disabled.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm i
```

### 2. Start Development Server

```bash
pnpm dev
```

This will start the development server at [http://localhost:8080](http://localhost:8080) with Turbopack for faster builds.

### 3. View the Application

Open [http://localhost:8080](http://localhost:8080) in your browser to see the landing page.

## 🏗️ Building for Production

### Build the Application

```bash
pnpm build
```

This command will:

1. Build the Next.js application
2. Generate the sitemap automatically (via postbuild hook)

### Start Production Server

```bash
pnpm start
```

This serves the built application at [http://localhost:8080](http://localhost:8080) using the `serve` package.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm sitemap` | Generate sitemap |
| `pnpm lighthouse:prod` | Run Lighthouse on production build |
| `pnpm lighthouse:local` | Run Lighthouse on local development |

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and configurations
└── styles/              # Global styles and Tailwind config
```

## 🌐 Deployment

This project is configured for static export.

1. Run `pnpm build` to generate the static site
2. Deploy the `out/` directory hosting provider
