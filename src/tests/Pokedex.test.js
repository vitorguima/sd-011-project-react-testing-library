import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithMemory from '../renderWithMemory';
import pokemons from '../data';
import App from '../App';

let getAllByTestId;
let getByTestId;
let getByText;

beforeEach(() => {
  ({ getAllByTestId, getByTestId, getByText } = renderWithMemory(<App />));
});

test('Test title h2 with text', () => {
  const h2 = getByText('Encountered pokémons');
  expect(h2.localName).toBe('h2');
});

test('Test next pokémon button', () => {
  const next = getByTestId('next-pokemon');
  userEvent.click(next);

  expect(getByText('Charmander')).toBeInTheDocument();
  expect(next).toHaveTextContent('Próximo pokémon');
});

test('Test all list pokemons with filters', () => {
  const filters = [getByText('All'), ...getAllByTestId('pokemon-type-button')];
  expect(filters).toHaveLength(parseInt('8', 0));
  const next = getByTestId('next-pokemon');

  filters.forEach((filter) => {
    let pokes;
    userEvent.click(filter);
    const isAll = (filter.textContent === 'All');

    if (!isAll) {
      pokes = pokemons.filter(({ type }) => type === filter.textContent);
    } else {
      pokes = pokemons;
    }

    pokes.forEach(({ name, type }) => {
      const pokemonName = getByTestId('pokemon-name');
      const pokemonType = getByTestId('pokemon-type');
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);

      if (!isAll) {
        expect(filter.textContent).toBe(type);
      }

      if (pokes.length === 1) {
        expect(next).toBeDisabled();
      }

      userEvent.click(next);
    });

    if (isAll) {
      expect(getByText('Pikachu')).toBeInTheDocument();
    }
  });
});
