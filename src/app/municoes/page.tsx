// app/municoes/page.tsx
import { Metadata } from 'next';
import MunicoesClient from './municoes.client';
import { ammoData } from '@/data/ammoData';

export const metadata: Metadata = {
  title: 'ArenaBreakoutBR | Gráfico de Munição e Armadura 📊',
  description:
    'Arena Breakout: Infinite Gráficos de Munição e Armadura criados por João Pster 🙌',
  openGraph: {
    images: [
      {
        url: './opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Arena Breakout Brasil Gráfico de Munição',
        type: 'image/png',
      },
    ],
  },
};

export default function Municoes() {
  const calibers = [
    'Favoritos',
    ...Array.from(new Set(ammoData.map((ammo) => ammo.Caliber))),
  ];

  return (
    <MunicoesClient initialCalibersList={calibers} initialAmmoData={ammoData} />
  );
}
