import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('No favorite pokemon found appears on the screen', () => {
  const { getByText } = render(<FavoritePokemons />);
  const unfavoritePokemom = getByText(/No favorite pokemon found/i);
  expect(unfavoritePokemom).toBeInTheDocument();
});
