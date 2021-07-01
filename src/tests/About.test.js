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

it('contains an Pokédex image', () => {
  // https://testing-library.com/docs/queries/byrole/
  const { getByRole } = renderWithRouter(<About />);
  expect(getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
