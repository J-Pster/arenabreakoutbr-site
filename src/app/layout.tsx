import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/shared/scripts/ga4';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arena Breakout Brasil | Guia e Recursos',
  description:
    'O seu hub definitivo para Arena Breakout no Brasil. Encontre guias, dicas, gráficos de munições e muito mais para dominar o jogo!',
  openGraph: {
    type: 'website',
    url: 'https://arenabreakoutbr.com',
    title: 'Arena Breakout Brasil | Guia e Recursos',
    description:
      'O seu hub definitivo para Arena Breakout no Brasil. Encontre guias, dicas, gráficos de munições e muito mais para dominar o jogo!',
    images: [
      {
        url: 'https://i.imgur.com/VbkKGbl.png',
        width: 1200,
        height: 630,
        alt: 'Arena Breakout Brasil Logo',
      },
    ],
    siteName: 'Arena Breakout Brasil',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abinfinitebr',
    title: 'Arena Breakout Brasil | Guia e Recursos',
    description:
      'O seu hub definitivo para Arena Breakout no Brasil. Encontre guias, dicas, gráficos de munições e muito mais para dominar o jogo!',
    images: ['https://i.imgur.com/VbkKGbl.png'],
  },
  keywords: [
    'Arena Breakout',
    'Brasil',
    'guia',
    'dicas',
    'munições',
    'recursos',
    'jogos',
  ],
  authors: [{ name: 'João Pster' }],
  creator: 'João Pster',
  publisher: 'Arena Breakout Brasil',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics ga_id="G-VHHZBRMEM1" />
    </html>
  );
}
