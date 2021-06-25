import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 3', () => {
  it(`Deve ser exibido na tela a mensagem "No favorite pokemon found",
  se a pessoa não tiver pokémons favoritos.`,
  () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Deve ser exibido todos os cards de pokémons favoritados.',
    () => {
      const pokemons = [data[0], data[1]];
      const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
      expect(getByText('Pikachu')).toBeInTheDocument();
      expect(getByText('Charmander')).toBeInTheDocument();
    });

  it('Nenhum card de pokémon deve ser exibido, se ele não estiver favoritado.',
    () => {
      const { container } = renderWithRouter(<FavoritePokemons />);
      expect(container.querySelector('.favorite-pokemons')).not.toBeInTheDocument();
    });
});
