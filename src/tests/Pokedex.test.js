import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Test page with h2 header and Pokemons text', () => {
  const { getByRole } = renderWithRouter(<App />);
  const support = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
  expect(support).toBeInTheDocument();
});

test('Test button and text next pokemon', () => {
  const { getByRole } = renderWithRouter(<App />);
  expect(getByRole('button', { name: 'Próximo pokémon' })).toBeInTheDocument();
});

test('Test shown only one at a time', () => {
  const { getAllByText } = renderWithRouter(<App />);
  expect(getAllByText(/kg/i).length).toEqual(1);
});

test('Test shown only one Pokemon at a time', () => {
  const { queryByText } = renderWithRouter(<App />);
  expect(queryByText('Pikachu')).toBeInTheDocument();
  expect(queryByText('Charmander')).not.toBeInTheDocument();
  expect(queryByText('Caterpie')).not.toBeInTheDocument();
});

test('Test pokedex integrates by Pokemons of that type', () => {
  const { queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByText('Fire'));
  expect(queryByText('Charmander')).toBeInTheDocument();
  fireEvent.click(queryByText('Próximo pokémon'));
  expect(queryByText('Charmander')).not.toBeInTheDocument();
  expect(queryByText('Rapidash')).toBeInTheDocument();
});

test('Pokédex Test Filter Reset Button', () => {
  const { queryByRole, queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByRole('button', { name: 'All' }));
  expect(queryByText('All')).toBeInTheDocument();
});

test('dynamically test filter button for each type of Pokémon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const numberButtons = 7;
  expect(getAllByTestId('pokemon-type-button').length).toBe(numberButtons);
});
