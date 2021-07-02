import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('if there is a message for empty favorite pokemons', () => {
  const { getByText } = render(<FavoritePokemons />);

  const pokemonNotFoundMessage = getByText('No favorite pokemon found');

  expect(pokemonNotFoundMessage).toBeInTheDocument();
});
