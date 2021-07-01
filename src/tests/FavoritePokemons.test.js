import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('test page favorite pokemons', () => {
  const { getByText } = render(<FavoritePokemons />);

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
