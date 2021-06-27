import React from 'react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import RenderWithRouter from '../RenderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa msg se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    const noFavoritePokPage = getByText(/No favorite pokemon found/);
    expect(noFavoritePokPage).toBeInTheDocument();
  });
  it('Testa se todos os cards de pokémons podem ser favoritados', () => {
    const { getAllByTestId } = RenderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });
  it('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const emptyArray = [];
    const { queryAllByTestId } = RenderWithRouter(
      <FavoritePokemons pokemons={ emptyArray } />,
    );
    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
