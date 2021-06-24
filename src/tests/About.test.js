import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('A página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = render(<About />);
  const header = getByText('About Pokédex');
  expect(header).toBeInTheDocument();
});

test('A página contém a seguinte imagem de uma Pokédex', () => {
  const { getByAltText } = render(<About />);
  const pokedexImage = getByAltText('Pokédex');
  expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getAllByTestId } = render(<About />);
  const pokedexParagraph = getAllByTestId('about-paragraph');
  expect(pokedexParagraph.length).toBe(2);
});
