import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const pokemonNames = pokemons.map(({ name }) => name);
const numberOfPokemons = pokemonNames.length;
const nextBtntext = 'next-pokemon';

describe('Renders Pokédex page', () => {
  it('render a header with text "Encontered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
  });

  it('renders the next pokemon when nextButton is clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const nextBtn = getByTestId(nextBtntext);

    expect(nextBtn).toHaveTextContent('Próximo pokémon');
  });

  it('renders pokemons, one by one', () => {
    const { getByTestId } = renderWithRouter(<App />);

    pokemonNames.forEach((elem) => {
      const currPokemon = getByTestId('pokemon-name');

      expect(elem).toBe(currPokemon.textContent);
      userEvent.click(getByTestId(nextBtntext));
    });
  });

  it('renders pokemons by type ', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeBtn = getAllByTestId('pokemon-type-button');

    pokemonTypeBtn.forEach((elem) => {
      userEvent.click(elem);
      for (let i = 0; i < numberOfPokemons; i += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(elem.textContent);
        userEvent.click(getByTestId(nextBtntext));
      }
    });
  });

  it('renders all pokemons available', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    expect(getByText('All')).toBeInTheDocument();
    userEvent.click(getByText('All'));

    const pokemonsDisplayed = [];

    for (let i = 0; i < numberOfPokemons; i += 1) {
      const currPokemon = getByTestId('pokemon-name').textContent;
      pokemonsDisplayed.push(currPokemon);
      userEvent.click(getByTestId(nextBtntext));
    }
    pokemons.forEach(({ name }) => {
      const comparation = pokemonsDisplayed.find((elem) => elem === name);
      expect(comparation).toBe(name);
    });
  });

  it('disable nextButton when there is just one pokemon of a type', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const pokemonTypeBtn = getAllByTestId('pokemon-type-button');

    pokemonTypeBtn.forEach((elem) => {
      const currType = pokemons.filter(({ type }) => type === elem.textContent);
      if (currType.length === 1) {
        userEvent.click(elem);
        expect(getByTestId(nextBtntext)).toBeDisabled();
      }
    });
  });
});
