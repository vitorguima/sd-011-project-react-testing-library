import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
// import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('testa mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const head = getByText(/No favorite pokemon found/i);
    expect(head).toBeInTheDocument();
    expect(head.textContent).toMatch(/No favorite pokemon found/i);
  });
});
