import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritedData = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: true,
  78: true,
  143: false,
  148: false,
  151: false,
};

test('heading with text `Encountered pokémons`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritedData }
      />
      ,
    </MemoryRouter>,
  );
  const heading = getByText(/Encountered pokémons/);

  // Error heading.value
  expect(heading.value).toBeInTheDocument();
});
