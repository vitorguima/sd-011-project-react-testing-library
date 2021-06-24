import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);

  expect(getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons')).toBeInTheDocument();
  expect(getByText('One can filter Pokémons by type, and see more details for each one of them')).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole, getByText } = renderWithRouter(<About />);
  expect(getByRole('heading')).toBeInTheDocument();
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Teste se a página contém a imagem de uma Pokédex.', () => {
  const { container } = renderWithRouter(<About />);
  const image = container.querySelector('.pokedex-image');

  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
