import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import { renderWithRouter } from '../helpers';
import pokemons from '../data';
import { isPokemonFavoriteById } from '../mockedFavoritePokemons';

const testIDs = {
  pokemonName: 'pokemon-name',
};

const pokemonsByType = pokemons
  .reduce((acc, pokemon) => {
    const { type } = pokemon;

    if (acc[type]) {
      acc[type].push(pokemon);
    } else {
      acc[type] = [pokemon];
    }

    return acc;
  }, {});

let nextPokemonButton;

function expectPokemonsElementsFrom(pokemonList) {
  pokemonList.forEach(({ name }) => {
    const currentPokemonName = screen.getByTestId(testIDs.pokemonName).textContent;

    expect(currentPokemonName).toBe(name);

    fireEvent.click(nextPokemonButton);
  });

  const lastPokemonShownName = screen.getByTestId(testIDs.pokemonName).textContent;

  expect(lastPokemonShownName).toBe(pokemonList[0].name);
}

describe('Pokedex.js:', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
  });

  it('The page must contain a heading with the page title.', () => {
    const pageHeading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(pageHeading).toBeInTheDocument();
  });

  it('A new pokemon must be shown when the "next pokemon" button is clicked.', () => {
    expect(nextPokemonButton).toBeInTheDocument();
    expectPokemonsElementsFrom(pokemons);
  });

  it('There should be only one pokemon in the screen at a time.', () => {
    expect(nextPokemonButton).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      const currentPokemonsNames = screen.getAllByTestId(testIDs.pokemonName);

      expect(currentPokemonsNames.length).toBe(1);
      expect(currentPokemonsNames[0].textContent).toBe(name);

      fireEvent.click(nextPokemonButton);
    });
  });

  it('There should be buttons to filter by pokemon type.', () => {
    Object.keys(pokemonsByType).forEach((type) => {
      const typeFilterButton = screen.getByRole('button', {
        name: type,
      });

      expect(typeFilterButton).toBeInTheDocument();
    });
  });

  it('The pokemon list should be filtered when a filter button is clicked.', () => {
    Object.entries(pokemonsByType).forEach(([type, pokemonsOfType]) => {
      const typeFilterButton = screen.getByRole('button', {
        name: type,
      });

      fireEvent.click(typeFilterButton);

      expectPokemonsElementsFrom(pokemonsOfType);
    });
  });

  it('The pokedex must have a filter reset button.', () => {
    const resetFiltersButton = screen.getByRole('button', {
      name: /all/i,
    });
    const fireFilterButton = screen.getByRole('button', {
      name: /fire/i,
    });

    expect(resetFiltersButton).toBeInTheDocument();
    expectPokemonsElementsFrom(pokemons);

    fireEvent.click(fireFilterButton);
    fireEvent.click(resetFiltersButton);

    expectPokemonsElementsFrom(pokemons);
  });

  it('The \'next pokemon\' button must be disabled when '
    + 'the list of a given type has only one pokemon.', () => {
    const singlePokemonTypesList = Object.entries(pokemonsByType)
      .reduce((acc, [type, pokemonsOfType]) => {
        if(pokemonsOfType.length === 1) {
          acc = [...acc, type];
        }

        return acc;
      }, []);

    singlePokemonTypesList.forEach((type) => {
      const typeFilterButton = screen.getByRole('button', {
        name: type,
      });

      fireEvent.click(typeFilterButton);

      expect(nextPokemonButton).toBeDisabled();
    });
  });
});
