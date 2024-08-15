'use client';

import Head from 'next/head';
import { Box, Heading, Input } from '@chakra-ui/react';
import { AmmoTable } from '@/shared/components/molecules/AmmoTable.molecule';
import styles from './municoes.module.scss';
import { ammoData } from '@/data/ammoData';
import { useState, useEffect } from 'react';
import { useGoogleAnalytics } from '@/shared/hooks/ga4';

const Municoes = () => {
  const { sendEvent } = useGoogleAnalytics();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collapsedTables, setCollapsedTables] = useState<string[]>([]);
  const calibers = [
    'Favoritos',
    ...new Set(ammoData.map((ammo) => ammo.Caliber)),
  ];

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    sendEvent('page_view', { page_title: 'Munições' });
  }, [sendEvent]);

  const toggleFavorite = (ammoName: string) => {
    const newFavorites = favorites.includes(ammoName)
      ? favorites.filter((fav) => fav !== ammoName)
      : [...favorites, ammoName];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleCollapse = (caliber: string) => {
    setCollapsedTables((prev) =>
      prev.includes(caliber)
        ? prev.filter((cal) => cal !== caliber)
        : [...prev, caliber]
    );
  };

  const filteredAmmoData = ammoData.filter(
    (ammo) =>
      ammo.Caliber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={styles.container}>
      <main>
        <Box className={styles.header}>
          <Heading as="h1" className={styles.title}>
            Arena Breakout: Infinite
            <br />
            Gráficos de Munição e Armadura
          </Heading>
          <Box className={styles.subtitle}>
            Atualizado em 13 de Agosto, por{' '}
            <a
              href="https://arenabreakoutbr.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ArenaBreakoutBR.com
            </a>
          </Box>
        </Box>

        <Box className={styles.content}>
          <Input
            placeholder="Pesquisar por calibre ou nome da munição... ex: 39mm ou lps"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {calibers.map((caliber) => (
            <AmmoTable
              key={caliber}
              caliber={caliber}
              ammoData={
                caliber === 'Favoritos'
                  ? filteredAmmoData.filter((ammo) =>
                      favorites.includes(`${ammo.Caliber} ${ammo.Name}`)
                    )
                  : filteredAmmoData.filter((ammo) => ammo.Caliber === caliber)
              }
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              isCollapsed={collapsedTables.includes(caliber)}
              toggleCollapse={() => toggleCollapse(caliber)}
            />
          ))}
        </Box>
      </main>
    </Box>
  );
};

export default Municoes;
