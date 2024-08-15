'use client';

import { Box, Center, Heading, Input, Spinner } from '@chakra-ui/react';
import { AmmoTable } from '@/shared/components/molecules/AmmoTable/AmmoTable.molecule';
import styles from './municoes.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { useGoogleAnalytics } from '@/shared/hooks/ga4';
import { AmmoData } from '@/data/ammoData';
import { AmmoComparison } from '@/shared/components/molecules/AmmoComparison/AmmoComparison.molecule';
import { AmmoSelector } from '@/shared/components/molecules/AmmoSelector/AmmoSelector.molecule';

interface MunicoesClientProps {
  initialCalibersList: string[];
  initialAmmoData: any[]; // Use o tipo correto para ammoData
}

const MunicoesClient: React.FC<MunicoesClientProps> = ({
  initialCalibersList,
  initialAmmoData,
}) => {
  const [selectedAmmo1, setSelectedAmmo1] = useState<AmmoData | null>(null);
  const [selectedAmmo2, setSelectedAmmo2] = useState<AmmoData | null>(null);

  const { sendEvent } = useGoogleAnalytics();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collapsedTables, setCollapsedTables] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    sendEvent('page_view', { page_title: 'Munições' });
    setIsLoaded(true);
  }, []); // Empty dependency array

  const toggleFavorite = useCallback((ammoName: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(ammoName)
        ? prev.filter((fav) => fav !== ammoName)
        : [...prev, ammoName];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const toggleCollapse = useCallback((caliber: string) => {
    setCollapsedTables((prev) =>
      prev.includes(caliber)
        ? prev.filter((cal) => cal !== caliber)
        : [...prev, caliber]
    );
  }, []);

  const filteredAmmoData = initialAmmoData.filter(
    (ammo) =>
      ammo.Caliber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAmmo1 = (ammoName: string) => {
    setSelectedAmmo1(
      initialAmmoData.find(
        (ammo) => `${ammo.Caliber} ${ammo.Name}` === ammoName
      ) || null
    );
  };

  const handleSelectAmmo2 = (ammoName: string) => {
    setSelectedAmmo2(
      initialAmmoData.find(
        (ammo) => `${ammo.Caliber} ${ammo.Name}` === ammoName
      ) || null
    );
  };

  if (!isLoaded) {
    return (
      <Center height="100vh" className={styles.loadingContainer}>
        <Spinner size="xl" color="yellow.500" thickness="4px" />
        <Box ml={4} fontSize="2xl" fontWeight="bold" color="yellow.500">
          Carregando...
        </Box>
      </Center>
    );
  }

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

        <Box>
          <AmmoSelector
            ammoData={initialAmmoData}
            label="Select Ammo 1"
            onChange={handleSelectAmmo1}
          />
          <AmmoSelector
            ammoData={initialAmmoData}
            label="Select Ammo 2"
            onChange={handleSelectAmmo2}
          />
          {selectedAmmo1 && selectedAmmo2 && (
            <AmmoComparison ammo1={selectedAmmo1} ammo2={selectedAmmo2} />
          )}
        </Box>

        <Box className={styles.content}>
          <Input
            placeholder="Pesquisar por calibre ou nome da munição... ex: 39mm ou lps"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suppressHydrationWarning
          />
          {initialCalibersList.map((caliber) => (
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

export default MunicoesClient;
