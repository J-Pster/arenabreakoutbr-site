import React from 'react';
import { AmmoData } from '@/data/ammoData';
import {
  Box,
  Text,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

interface AmmoComparisonProps {
  ammo1: AmmoData;
  ammo2: AmmoData;
}

export const AmmoComparison: React.FC<AmmoComparisonProps> = ({
  ammo1,
  ammo2,
}) => {
  const properties = [
    'Damage',
    'Penetration',
    'Pierce Level',
    'Armor Damage',
    'Velocity (m/s)',
    'Accuracy',
    'V.Recoil Control',
    'H.Recoil Control',
    'Wound Chance',
    'Extra Range',
    'Stamina Drain',
  ];

  const bg = useColorModeValue('gray.700', 'gray.800');

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      padding="4"
    >
      {properties.map((prop) => (
        <VStack
          key={prop}
          p="4"
          bg={bg}
          borderRadius="md"
          boxShadow="base"
          alignItems="center"
          width="220px" // Define a width for consistent sizing
          margin="2"
        >
          <Heading size="sm" color="yellow.400">
            {prop.replace(/([A-Z])/g, ' $1').trim()}
          </Heading>
          <Text fontSize="md" color="white">
            {ammo1[prop]}
          </Text>
          <Text fontSize="md" color="white">
            {ammo2[prop]}
          </Text>
        </VStack>
      ))}
    </Box>
  );
};
