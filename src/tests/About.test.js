import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('tests information about "Pokédex"', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText('About Pokédex');
  expect(about).toBeInTheDocument();
});
test('tests two paragraphs', () => {
  const { getByText } = renderWithRouter(<About />);
  const paragraphOne = getByText(/This application/i);
  expect(paragraphOne).toBeInTheDocument();
  const paragraphTwo = getByText(/One can filter/i);
  expect(paragraphTwo).toBeInTheDocument();
});

test('tests have image', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const image = getByAltText('Pokédex');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
