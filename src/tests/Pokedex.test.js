import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokeMap = pokemons.map(({ name }) => name);
const nextButton = 'Próximo pokémon';
const pokeName = 'pokemon-name';

describe('Tests of pokedex component', () => {
  test('test if has h2 with text encountered pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/);
    expect(h2).toBeInTheDocument();
  });
  test('if has button Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const button = getByTestId(/next-pokemon/);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Próximo pokémon');
  });
  test('test if by clicking proximo pokemon button it goes to the next', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const poke = getByTestId(pokeName);
    const nextPoke = getByText(nextButton);
    pokeMap.forEach((e) => {
      const pokemon = getByTestId(pokeName);
      expect(pokemon.textContent).toBe(e);
      fireEvent.click(nextPoke);
    });
    expect(poke.textContent).toBe('Pikachu');
  });
  test('test if it filters pokemon by its type', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    const nextPokemon = getByText(nextButton);
    typeButtons.forEach((e) => {
      fireEvent.click(e);
      console.log(e.textContent);
      for (let index = 0; index < pokeMap.length; index += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(e.textContent);
        fireEvent.click(nextPokemon);
      }
    });
  });

  test('test if starts rendering all pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText(nextButton);
    const allPokemon = getByText('All');
    expect(allPokemon).toBeInTheDocument();
    fireEvent.click(allPokemon);
    pokeMap.forEach((e) => {
      expect(getByTestId(pokeName).textContent).toBe(e);
      fireEvent.click(nextPokemon);
    });
  });
});
