import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('renders a reading with the text `About Pokédex` in a <h2>', () => {
  const { getByText, getByRole } = renderWithRouter(<About />);
  const h2 = getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  const text = getByText(/About Pokédex/);
  expect(text).toBeInTheDocument();
});

test('renders 2 paragraphs with the text about pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const text1 = getByText(/This application simulates a Pokédex,/,
    /a digital encyclopedia containing all Pokémons/);
  expect(text1).toBeInTheDocument();
  const text2 = getByText(/One can filter Pokémons by type,/,
    /and see more details for each one of them/);
  expect(text2).toBeInTheDocument();
});

test('renders a specified image', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const imageDex = getByAltText(/Pokédex/);
  const { src } = imageDex;
  expect(src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
