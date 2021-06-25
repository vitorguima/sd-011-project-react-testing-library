import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Encountered pokémons` in a <h2>', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const h2 = getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  const text = getByText(/Encountered pokémons/);
  expect(text).toBeInTheDocument();
});

test('renders next pkmn after click, return to first after last', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const btnText = getByText(/Próximo pokémon/);
  expect(btnText).toBeInTheDocument();
  const pikaText = getByText(/Pikachu/);
  expect(pikaText).toBeInTheDocument();
  const nextButton = getByTestId('next-pokemon');
  fireEvent.click(nextButton);
  const charText = getByText(/Charmander/);
  expect(charText).toBeInTheDocument();
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  expect(pikaText).toBeInTheDocument();
});

test('renders 1 pokemon at time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const divPokemon = getAllByTestId('pokemon-name');
  expect(divPokemon.length).toBe(1);
});

test('shows filter buttons', () => {
  const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />);
  const filterButtons = getAllByTestId('pokemon-type-button');
  const reuiredLenght = 7;
  expect(filterButtons.length).toBe(reuiredLenght);
  const psychicButton = getByText(/Psychic/);
  const nextButton = getByTestId('next-pokemon');
  fireEvent.click(psychicButton);
  const alakazam = getByText(/Alakazam/);
  expect(alakazam).toBeInTheDocument();
  fireEvent.click(nextButton);
  const mew = getByText(/Mew/);
  expect(mew).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(alakazam).toBeInTheDocument();
});

test('show a button to reset filter', () => {
  const { getByText } = renderWithRouter(<App />);
  const allButton = getByText(/All/);
  const nextButton = getByText(/Próximo pokémon/);
  const pikaText = getByText(/Pikachu/);
  expect(pikaText).toBeInTheDocument();
  fireEvent.click(nextButton);
  const charText = getByText(/Charmander/);
  expect(charText).toBeInTheDocument();
  const psychicButton = getByText(/Psychic/);
  fireEvent.click(psychicButton);
  const alakazam = getByText(/Alakazam/);
  expect(alakazam).toBeInTheDocument();
  fireEvent.click(allButton);
  expect(pikaText).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(charText).toBeInTheDocument();
});

test('shows all filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const filterButtons = getAllByTestId('pokemon-type-button');
  const reuiredLenght = 7;
  expect(filterButtons.length).toBe(reuiredLenght);
});
