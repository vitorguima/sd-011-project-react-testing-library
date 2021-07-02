import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons.js', () => {
  it('testa se "No favorite pokemon found" aparece se não houver favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const textNoFavorite = getByText(/No favorite pokemon found/i);
    expect(textNoFavorite).toBeInTheDocument();
  });
});
