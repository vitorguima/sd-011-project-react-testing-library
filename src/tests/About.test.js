import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const pokedexText = getByText(/This application simulates a Pokédex/i);
  expect(pokedexText).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const aboutText = container.querySelector('h2');
  expect(aboutText).toHaveTextContent('About Pokédex')
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const pokedexImg = container.querySelector('img');
  expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png')
});

