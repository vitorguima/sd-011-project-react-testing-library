import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

// for this tests I consulted filizzola's repo
// https://github.com/tryber/sd-011-project-react-testing-library/blob/filizzola-testing-library/src/tests/Pokedex.test.js

it('contains `Encountered pokémons`, `Próximo pokémon` button and each pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const next = getByText('Próximo pokémon');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(next).toBeInTheDocument();
  const pokemonsArr = data.map((pokemon) => pokemon.name);
  pokemonsArr.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    fireEvent.click(next);
  });
});

it('contains all pokemons type buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttonsArr = getAllByTestId('pokemon-type-button');
  expect(buttonsArr[0]).toHaveTextContent('Electric');
  expect(buttonsArr[1]).toHaveTextContent('Fire');
  expect(buttonsArr[2]).toHaveTextContent('Bug');
  expect(buttonsArr[3]).toHaveTextContent('Poison');
  expect(buttonsArr[4]).toHaveTextContent('Psychic');
  expect(buttonsArr[5]).toHaveTextContent('Normal');
  expect(buttonsArr[6]).toHaveTextContent('Dragon');
});

it('render all pokemons when `All` clicked', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('All'));
  const pokemonsArr = data.map((pokemon) => pokemon.name);
  pokemonsArr.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
  });
});
