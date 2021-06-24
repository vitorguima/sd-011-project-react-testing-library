import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';

describe('Verifica requisito 3', () => {
  it('Teste se a pessoa não tiver pokémons favoritos..', () => {
    renderWithRouter(<FavoritePokemons />);
    const texto = screen.getByText(/No favorite pokemon found/i);
    expect(texto).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados..', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
