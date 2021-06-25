import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../components';
import Pokedex from '../components/Pokedex';
import pokemons from '../data'

describe('testing Pokedex component', () => {
  it('verify if contain a heading h2 \'Encountered pokémons\'', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite={ [] }
      />,
    );
    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('tests if the next pokemon renders when user clicks in \'Próximo pokémon\'', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite={ [] }
      />,
    );
    pokemons.forEach((pokemon) => {
      const actualPokemonName = pokemon.name;
      expect(actualPokemonName).toBeInTheDocument();

      const nextBtn = getByText('Próximo pokémon');
      fireEvent.click(nextBtn);
    });
    const nextBtn = getByText('Próximo pokémon');
    fireEvent.click(nextBtn);

    const actualPokemonName = pokemons[0].name;
    expect(actualPokemonName).toBeInTheDocument();

    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('test if ', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite={ [] }
      />,
    );
  });
});
