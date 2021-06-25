import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

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
      const actualPokemonName = getByText(pokemon.name);
      expect(actualPokemonName).toBeInTheDocument();

      const nextBtn = getByText('Próximo pokémon');
      fireEvent.click(nextBtn);

      if (pokemon.length - 1) {
        const nextPokemon = getByText('Pikachu');
        expect(nextPokemon).toBeInTheDocument();
      }
    });
  });

  it('tests if render only one pokemon at time', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite={ [] }
      />,
    );
    const pokeArray = [];

    pokemons.forEach(({ name }) => {
      const pokemonName = getByText(name);
      expect(pokemonName).toBeInTheDocument();
      pokeArray.push(name);

      const nextBtn = getByText('Próximo pokémon');
      fireEvent.click(nextBtn);
    });
    const filteredNamesDisplayed = pokeArray.filter((name) => getByText(name));
    expect(filteredNamesDisplayed.length).toHaveLength(1);
  });
});
