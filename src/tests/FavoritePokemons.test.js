import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

test('Teste se é exibido na tela a mensagem No favorite pokemon found...', () => {
  const { queryByText, getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  expect(queryByText('Pikachu')).not.toBeInTheDocument();
  expect(queryByText('Charmander')).not.toBeInTheDocument();
  expect(queryByText('Caterpie')).not.toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  render(<FavoritePokemons />);
});
