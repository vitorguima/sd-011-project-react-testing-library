import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Test if the page contains a heading', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Test whether the next Pokémon in the list is displayed', () => {
  const { getByText } = renderWithRouter(<App />);
  const btn = getByText('Próximo pokémon');
  fireEvent.click(btn);
  expect(getByText('Charmander')).toBeInTheDocument();
});

test('Test if Pokédex has filter buttons', () => {
  const numb = 7;
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-type-button').length).toBe(numb);
  const btnPsychic = getByText('Psychic');
  const btnAll = getByText('All');
  fireEvent.click(btnPsychic);
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click(btnAll);
  const btn = getByText('Próximo pokémon');
  fireEvent.click(btn);
  expect(getByText('Charmander')).toBeInTheDocument();
});
