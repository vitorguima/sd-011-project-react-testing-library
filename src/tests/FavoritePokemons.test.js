import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste 1: testa renderização da mensagem', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const info = getByText('No favorite pokemon found');

  expect(info).toBeInTheDocument();
});
