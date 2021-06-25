import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testando o componente FavoritePokemons', () => {
  it('"No favorite pokemon found", se não houver favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const contentText = getByText(/No favorite pokemon found/);
    expect(contentText).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokemóns favoritados.', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });

  it('Nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
