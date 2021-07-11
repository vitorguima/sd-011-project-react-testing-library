import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Pokédex is rendered when loading the application into `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  expect(getByText(/Encountered Pokémons/i)).toBeInTheDocument();
});
