import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('tests Pokedex component', () => {
  test('Test if the page has a Pokémon scan so found', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText('Encountered pokémons');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('test the next button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();

    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(nextPokemon);

    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    for (let index = 1; index < pokemons.length; index += 1) {
      const currentPokemon = getByText(pokemons[index].name);
      expect(currentPokemon).toBeInTheDocument();
      userEvent.click(nextPokemon);
    }
  });

  test('Test whether a Pokémon is shown', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonShown = getAllByTestId('pokemon-name');
    expect(pokemonShown.length).toBe(1);
  });

  test('Test whether it contains a button to reset filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const reset = getByText('All');
    expect(reset).toBeInTheDocument();

    userEvent.click(reset);

    const defaultPokemon = getByText('Pikachu');
    expect(defaultPokemon).toBeInTheDocument();
  });

  test('Test whether a filter button is created for each type of Pokémon', () => {
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    allTypes.forEach((currentType, index) => {
      const pokemonType = getAllByTestId('pokemon-type-button')[index];
      expect(pokemonType).toBeInTheDocument();
      const current = getByRole('button', { name: currentType });
      expect(current).toBeInTheDocument();
    });
  });
});
