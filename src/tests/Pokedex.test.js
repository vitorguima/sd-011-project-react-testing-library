import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('<Pokedex.js /> component testing', () => {
  const nextPokemon = 'next-pokemon';
  it('contains h2 heading with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  it('renders next Pokémon when "Próximo pokémon" button is clicked', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId(nextPokemon);
    expect(nextButton).toBeInTheDocument();
    // verifica se o card do primeiro pokemon esta sendo renderizado e clica no botao para vir um novo pokemon. verifica se card do novo pokemon esta sendo renderizado, clica no botao e assim sucessivamente, para todos os pekemons presentes em data. assim, quando o botao for apertado pela ultima vez, o card do pokemon que deve estar sendo renderizado é o do primeiro (indice 0) pokemon.
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('contains filtering buttons', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />);
    // Set() - Ref:
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    const types = [...new Set(pokemons.map((pokemon) => pokemon.type))];
    const buttons = getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      expect(buttons[index].textContent).toBe(type);
    });
    fireEvent.click(buttons[1]);
    const pokemonNamesOfType = pokemons
      .filter((pokemon) => pokemon.type === buttons[1].textContent)
      .map((pokemon) => pokemon.name);
    pokemonNamesOfType.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByTestId(nextPokemon));
    });
  });
  it('contains reset filter button', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const resetButton = getByText('All');
    const nextButton = getByTestId(nextPokemon);
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  it('disables "Próximo pokémon" button when there`s only 1 Pokémon of that type', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    fireEvent.click(buttons[0]);
    const nextButton = getByText('Próximo pokémon');
    expect(nextButton.disabled).toBeTruthy();
  });
});
