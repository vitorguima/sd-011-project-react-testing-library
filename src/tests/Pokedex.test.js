import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemonNames = pokemons.map(({ name }) => name);
const numberOfPokemons = pokemonNames.length;
const buttonNextPokemon = 'next-pokemon';

describe('Test Pokédex', () => {
  test('render a header with text "Encontered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
  });

  test('the next pokemon when nextButton is clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const buttonNext = getByTestId(buttonNextPokemon);

    expect(buttonNext).toHaveTextContent('Próximo pokémon');
  });

  test('renders pokemons, one by one', () => {
    const { getByTestId } = renderWithRouter(<App />);

    pokemonNames.forEach((el) => {
      const currPokemon = getByTestId('pokemon-name');

      expect(el).toBe(currPokemon.textContent);
      userEvent.click(getByTestId(buttonNextPokemon));
    });
  });

  test('renders pokemons by type ', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeButton = getAllByTestId('pokemon-type-button');

    pokemonTypeButton.forEach((el) => {
      userEvent.click(el);
      for (let index = 0; index < numberOfPokemons; index += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(el.textContent);
        userEvent.click(getByTestId(buttonNextPokemon));
      }
    });
  });

  test('Pokédex contains a button to reset the filter', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    expect(getByText('All')).toBeInTheDocument();
    userEvent.click(getByText('All'));

    const displayedPokemom = [];

    for (let index = 0; index < numberOfPokemons; index += 1) {
      const currPokemon = getByTestId('pokemon-name').textContent;
      displayedPokemom.push(currPokemon);
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
});
