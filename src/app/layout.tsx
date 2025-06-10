import '../styles/globals.css';
import { Metadata } from 'next';
import ClientLayout from '../components/layouts/ClientLayout';

// Base path for GitHub Pages deployment
const basePath = process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '';

export const metadata: Metadata = {
  title: 'DoorLoop Property Management Software',
  description:
    'The highest-rated property management software for residential, commercial, student housing, and HOA properties.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <base href="/" />
        {/* Preload critical resources for better LCP */}
        <link rel="preload" href={`${basePath}/hero-background.png`} as="image" />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
