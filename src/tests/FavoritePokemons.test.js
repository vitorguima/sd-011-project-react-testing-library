import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Exibe a mensagem No favorite pokemon found, se não tiver pokémon favorito', () => {
  const { getByText } = render(<FavoritePokemons />);
  const message = getByText('No favorite pokemon found');
  expect(message).toBeInTheDocument();
});
