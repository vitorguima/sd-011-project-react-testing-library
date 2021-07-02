import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('tests information about "Pokédex"', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});
test('tests two paragraphs', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText(/This application/i)).toBeInTheDocument();
  expect(getByText(/One can filter/i)).toBeInTheDocument();
});
test('tests have image', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const support = getByAltText('Pokédex');
  expect(support).toBeInTheDocument();
  expect(support).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
