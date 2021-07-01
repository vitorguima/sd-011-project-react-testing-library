import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

it('About page has two paragraphs and informations about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText(/This application simulates a Pokédex, a digit/i)).toBeInTheDocument();
  expect(getByText(/One can filter Pokémons by type, and see more/i)).toBeInTheDocument();
});

it('About page contains title with `About Pokédex`', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});
