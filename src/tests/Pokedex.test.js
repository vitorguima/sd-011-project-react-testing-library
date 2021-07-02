import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemonsName = pokemons.map(({ name }) => name);
const numberOfPokemons = pokemonsName.length;
const buttonNextPokemon = 'next-pokemom';

test('page contains a heading h2 with the text "Encountered pokemons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
});

test('render pokemom one by one', () => {
  const { getByTestId } = renderWithRouter(<App />);

  pokemonsName.forEach((el) => {
    const nameID = getByTestId('pokemon-name');

    expect(el).toBe(nameID.textContent);
    userEvent.click(getByTestId(buttonNextPokemon));
  });
});

test('render pokemon by type', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
  const pokemonTypeButton = getAllByTestId('pokemon-type-button');

  pokemonTypeButton.forEach((el) => {
    userEvent.click(el);
    for (let index = 0; index < numberOfPokemons; index += 1) {
      expect(getByTestId('pokemom-type').textContent).toBe(el.textContent);
      userEvent.click(getByTestId(buttonNextPokemo));
    }
  });
});

test('Pokédex contains a button to reset the filter', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  expect(getByText('All')).toBeInTheDocument();
  userEvent.click(getByText('All'));

  const displayedPokemom = [];

  for (let index = 0; index < numberOfPokemons; index += 1) {
    const nameID = getByTestId('pokemon-name').textContent;
    displayedPokemom.push(nameID);
    userEvent.click(getByTestId(buttonNextPokemon));
  }
  pokemons.forEach(({ name }) => {
    const comparation = displayedPokemom.find((el) => el === name);
    expect(comparation).toBe(name);
  });
});

test('a filter button is dynamically created for each type of Pokémon.', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const pokemonTypeButton = getAllByTestId('pokemon-type-button');

  pokemonTypeButton.forEach((el) => {
    const currType = pokemons.filter(({ type }) => type === el.textContent);
    if (currType.length === 1) {
      userEvent.click(el);
      expect(getByTestId(buttonNextPokemon)).toBeDisabled();
    }
  });
});
