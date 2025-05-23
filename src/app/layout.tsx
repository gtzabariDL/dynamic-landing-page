import './globals.css';
import { Metadata } from 'next';

// These styles apply to every route in the application
export const metadata: Metadata = {
  title: 'DoorLoop Property Management Software',
  description: 'The highest-rated property management software for residential, commercial, student housing, and HOA properties.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <base href={process.env.NODE_ENV === 'production' ? '/dynamic-landing-page/' : '/'} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
