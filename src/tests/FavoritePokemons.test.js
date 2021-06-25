import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente Favorite Pokemons', () => {
  it('Testa se é exibido a mensagem No favorite pokemon found na tela', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('Testa se nenhum pokemom está favoritado', () => {
    
  });
});
