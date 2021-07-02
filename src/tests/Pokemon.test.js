import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokemons from '../data';
import { Pokemon } from '../components';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByText } = renderWithRouter(<Pokemon
    pokemon={ Pokemons }
  />);
  const { name, type, averageWeight: { value, measurementUnit }, image } = Pokemons[0];

  expect(getByText(name)).toBeInTheDocument();
  expect(getByText(type)).toBeInTheDocument();
  expect(getByText(`${value}${measurementUnit}`)).toBeInTheDocument();
  expect(getByText(image)).toBeInTheDocument();
});
