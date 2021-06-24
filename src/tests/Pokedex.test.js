import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
});
