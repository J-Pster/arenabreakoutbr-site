'use client';

import Head from 'next/head';
import { Box, Heading, Input } from '@chakra-ui/react';
import { AmmoTable } from '@/shared/components/molecules/AmmoTable.molecule';
import styles from './municoes.module.scss';
import { ammoData } from '@/data/ammoData';
import { useState } from 'react';

const Municoes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const calibers = [...new Set(ammoData.map((ammo) => ammo.Caliber))];

  const filteredAmmoData = ammoData.filter(
    (ammo) =>
      ammo.Caliber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={styles.container}>
      <Head>
        <title>ArenaBreakoutBR | Gráfico de Munição e Armadura 📊</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://i.imgur.com/emZ9jfl.png" />
        <meta
          name="description"
          content="Arena Breakout: Infinite Gráficos de Munição e Armadura criados por João Pster 🙌"
        />
      </Head>

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
              ammoData={filteredAmmoData.filter(
                (ammo) => ammo.Caliber === caliber
              )}
            />
          ))}
        </Box>
      </main>
    </Box>
  );
};

export default Municoes;
