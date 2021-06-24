import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const emptyPokemon = [];
const msg = 'No favorite pokemon found';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem ${msg},\
 se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(msg);
    expect(message).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const {
      getAllByTestId
    } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favoritePokemons = getAllByTestId('pokemon-name');
    expect(favoritePokemons.length).toBe(pokemons.length);
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const {
      queryAllByTestId
    } = renderWithRouter(<FavoritePokemons pokemons={ emptyPokemon } />);
    const pokemons = queryAllByTestId('pokemon-name');
    expect(pokemons.length < 1).toBe(true);
  });
});
