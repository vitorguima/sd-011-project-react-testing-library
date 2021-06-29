import React from 'react';
import { screen, act, fireEvent, within } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const cardPokemon = {
  NEXT_POKEMON: 'next-pokemon',
  POKEMON_NAME: 'pokemon-name',
  POKEMON_TYPE_BUTTON: 'pokemon-type-button',
};
const { click } = fireEvent;

describe('First part of tests related to the Pokédex component.', () => {
  test(`Checks if the page contains an 'h2' heading
  with the text 'Encountered pokemons'.`, () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const { getByText } = within(getByTestId('tag-title-encountered-pokemons'));
    expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  });

  test(`Test whether the 'next Pokémon' in the list is displayed
  when the Next Pokémon button is clicked.`, () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const nextButton = screen.getByTestId(cardPokemon.NEXT_POKEMON);
    expect(nextButton.textContent).toBe('Próximo pokémon');
    const pokemonName = screen.getByTestId(cardPokemon.POKEMON_NAME);
    expect(pokemonName.textContent).toBe('Pikachu');
    act(() => {
      click(nextButton);
    });
    expect(pokemonName.textContent).toBe('Charmander');
    act(() => {
      const numberOfClicks = 7;
      let clickCounter = 0;
      while (clickCounter !== numberOfClicks) {
        click(nextButton);
        clickCounter += 1;
      }
    });
    expect(pokemonName.textContent).toBe('Dragonair');
    act(() => {
      click(nextButton);
    });
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  test('Checks if only one Pokemon is shown at a time.', () => {
    const { container } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const containerPokemon = container.querySelectorAll('.pokemon');
    expect(containerPokemon.length).toBe(1);
  });

  test('Check if the Pokédex has the filter buttons.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const filterButton = screen.getAllByTestId(cardPokemon.POKEMON_TYPE_BUTTON);
    expect(filterButton[0].textContent).toBe('Electric');
    expect(filterButton[1].textContent).toBe('Fire');
    expect(filterButton[2].textContent).toBe('Bug');
    expect(filterButton[3].textContent).toBe('Poison');
    expect(filterButton[4].textContent).toBe('Psychic');
    expect(filterButton[5].textContent).toBe('Normal');
    expect(filterButton[6].textContent).toBe('Dragon');
    const namePokemon = screen.getByTestId(cardPokemon.POKEMON_NAME);
    expect(namePokemon.textContent).toBe('Pikachu');
    act(() => {
      click(filterButton[1]);
    });
    expect(namePokemon.textContent).toBe('Charmander');
    act(() => {
      click(screen.getByTestId(cardPokemon.NEXT_POKEMON));
    });
    expect(namePokemon.textContent).toBe('Rapidash');
  });
});

describe('Second part of tests related to the Pokédex component.', () => {
  test('Checks if the Pokédex contains a button to reset the filter.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const resetFilterButton = screen.getByText('All');
    const filterFire = screen.getAllByTestId('pokemon-type-button')[1];
    const nextButton = screen.getByTestId(cardPokemon.NEXT_POKEMON);
    const namePokemon = screen.getByTestId(cardPokemon.POKEMON_NAME);
    expect(namePokemon.textContent).toBe('Pikachu');
    expect(nextButton.disabled).toBe(false);
    act(() => {
      click(filterFire);
    });
    expect(namePokemon.textContent).toBe('Charmander');
    act(() => {
      click(resetFilterButton);
    });
    expect(namePokemon.textContent).toBe('Pikachu');
  });

  test(`Checks if a filter button is dynamically created
  for each type of Pokémon.`, () => {
    const { unmount } = renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1]] }
        isPokemonFavoriteById={ {} }
      />,
    );
    let filtersButton = screen.getAllByTestId(cardPokemon.POKEMON_TYPE_BUTTON);
    expect(filtersButton.length).toBe(2);
    expect(filtersButton[0].textContent).toBe('Electric');
    expect(filtersButton[1].textContent).toBe('Fire');
    screen.getByText('All');
    unmount();
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ {} }
      />,
    );
    const numberOfFiltersForPokemons = 3;
    filtersButton = screen.getAllByTestId(cardPokemon.POKEMON_TYPE_BUTTON);
    expect(filtersButton.length).toBe(numberOfFiltersForPokemons);
    expect(filtersButton[0].textContent).toBe('Electric');
    expect(filtersButton[1].textContent).toBe('Fire');
    expect(filtersButton[2].textContent).toBe('Bug');
    screen.getByText('All');
  });

  test(`Checks if the 'Next Pokémon' button is disabled when the Pokémon filtered list 
  has only one Pokémon.`, () => {
    const { unmount } = renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0]] }
        isPokemonFavoriteById={ {} }
      />,
    );

    let nextButton = screen.getByTestId(cardPokemon.NEXT_POKEMON);
    expect(nextButton.disabled).toBe(true);

    unmount();

    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ {} }
      />,
    );

    nextButton = screen.getByTestId(cardPokemon.NEXT_POKEMON);
    expect(nextButton.disabled).toBe(false);
  });
});
