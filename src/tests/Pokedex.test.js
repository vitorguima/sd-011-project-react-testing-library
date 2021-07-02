import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const pokemonNames = pokemons.map(({ name }) => name);
const numberOfPokemons = pokemonNames.length;
const nextBtntext = 'next-pokemon';

describe('Test Pokédex Component', () => {
  it('Test if the page contains an h2 with the text Encountered pokemons.', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
  });

  it('Test displaying the next Pokémon in the list by clicking the Next button', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const btnNext = getByTestId(nextBtntext);

    expect(btnNext).toHaveTextContent('Próximo pokémon');
  });

  it('test if show only one', () => {
    const { getByTestId } = renderWithRouter(<App />);

    pokemonNames.forEach((elem) => {
      const currentPokemon = getByTestId('pokemon-name');

      expect(elem).toBe(currentPokemon.textContent);
      userEvent.click(getByTestId(btnNexttext));
    });
  });

  it('test pokemons by type ', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const BtnPokemonType = getAllByTestId('pokemon-type-button');

    BtnPokemonType.forEach((elem) => {
      userEvent.click(elem);
      for (let i = 0; i < numberOfPokemons; i += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(elem.textContent);
        userEvent.click(getByTestId(btnNexttext));
      }
    });
  });

  it('test all pokemons available', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    expect(getByText('All')).toBeInTheDocument();
    userEvent.click(getByText('All'));

    const showPokemons = [];

    for (let i = 0; i < numberOfPokemons; i += 1) {
      const currentPokemon = getByTestId('pokemon-name').textContent;
      showPokemons.push(currentPokemon);
      userEvent.click(getByTestId(nextBtntext));
    }
    pokemons.forEach(({ name }) => {
      const compare = showPokemons.find((elem) => elem === name);
      expect(compare).toBe(name);
    });
  });

  it('show nextButton if there is just one type of pokemon ', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const BtnPokemonType = getAllByTestId('pokemon-type-button');

    BtnPokemonType.forEach((elem) => {
      const currentType = pokemons.filter(({ type }) => type === elem.textContent);
      if (currentType.length === 1) {
        userEvent.click(elem);
        expect(getByTestId(nextBtntext)).toBeDisabled();
      }
    });
  });
});
