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
        isFavorite
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
        isFavorite
      />,
    );
    pokemons.forEach((pokemon) => {
      const actualPokemonName = getByText(pokemon.name);
      expect(actualPokemonName).toBeInTheDocument();

      const nextBtn = getByText(/Próximo pokémon/);
      fireEvent.click(nextBtn);

      if (pokemon.length - 1) {
        const nextPokemon = getByText('Pikachu');
        expect(nextPokemon).toBeInTheDocument();
      }
    });
  });

  it('tests if render only one pokemon at time', () => {
    const { getByText, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite
      />,
    );

    pokemons.forEach(({ name }) => {
      const pokemonName = getByText(name);
      expect(pokemonName).toBeInTheDocument();

      const nextBtn = getByText('Próximo pokémon');
      fireEvent.click(nextBtn);

      const pokemonsDisplayed = pokemons.filter((pokemon) => queryByText(pokemon.name));
      expect(pokemonsDisplayed).toHaveLength(1);
    });
  });

  // eslint-disable-next-line max-len
  it('verify if each type of pokemons has a button to filter, and if when user clicks, only that type should appear', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite
      />,
    );

    const arrayOfPokemonBtns = getAllByTestId('pokemon-type-button');
    arrayOfPokemonBtns.forEach((pokemonButton) => {
      expect(pokemonButton).toBeInTheDocument();
    });

    const fireBtn = getByText('Fire');
    fireEvent.click(fireBtn);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    const nextPokemonBtn = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonBtn);

    const rapidash = getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
  });

  it('verify if the text of filter buttons has the same text as pokemon types', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite
      />,
    );
    const arrayOfPokemonBtns = getAllByTestId('pokemon-type-button');

    arrayOfPokemonBtns.forEach((button) => {
      const buttonText = button.innerHTML;
      const buttonSearch = pokemons.find(({ type }) => type === buttonText);
      expect(buttonSearch).toBeTruthy();
    });
  });

  // eslint-disable-next-line max-len
  it('verify if contains a button \'all\' to reset the filter type, if renders all pokemons when this button is selected', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
        isFavorite
      />,
    );
    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const nextPokemonBtn = getByText(/Próximo pokémon/i);
      const name = getByText(pokemon.name);
      expect(name).toBeInTheDocument();

      fireEvent.click(nextPokemonBtn);
    });
  });

  // Falta esse teste
  // it('verify if when the pokedex renders, the filter \'all\' will be selected', () => {
  //   const { getAllByRole } = renderWithRouter(
  //     <Pokedex
  //       pokemons={ pokemons }
  //       isPokemonFavoriteById={ {} }
  //       isFavorite
  //     />,
  //   );
  // });
});
