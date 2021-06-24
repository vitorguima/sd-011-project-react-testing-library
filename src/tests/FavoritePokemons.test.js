import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('testa mensagem No favorite pokemon found', () => {
    const { getByRole } = render(<FavoritePokemons />);
    const head = getByRole('heading');
    expect(head).toBeInTheDocument();
    expect(head.textContent).toBe(/No favorite pokemon found/i);
  });
});
