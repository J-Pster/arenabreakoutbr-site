import React from 'react';
import Select from 'react-select';
import { AmmoData } from '@/data/ammoData';
import { chakra } from '@chakra-ui/react';

interface AmmoSelectorProps {
  ammoData: AmmoData[];
  label: string;
  onChange: (ammoName: string) => void;
}

const ChakraReactSelect = chakra(Select);

export const AmmoSelector: React.FC<AmmoSelectorProps> = ({
  ammoData,
  label,
  onChange,
}) => {
  const options = ammoData.map((ammo) => ({
    value: `${ammo.Caliber} ${ammo.Name}`,
    label: `${ammo.Caliber} ${ammo.Name}`,
  }));

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: 'white',
      width: 300,
      marginBottom: '20px',
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? 'blue' // cor quando selecionado
          : isFocused
          ? 'lightblue' // cor quando focado
          : null,
        color: isDisabled ? '#ccc' : isSelected ? 'white' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

  return (
    <ChakraReactSelect
      options={options}
      styles={customStyles}
      placeholder={label}
      onChange={(option) => onChange(option ? option.value : '')}
    />
  );
};
