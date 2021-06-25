import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

test('2/1: Identifica renderização das infos sobre a Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const info = getByText('About Pokédex');

  expect(info).toBeInTheDocument();
});

test('2/2: Identifica renderização da imagem.', () => {
  const imageAdress = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const { getByAltText } = renderWithRouter(<About />);

  const image = getByAltText('Pokédex');

  expect(image).toHaveAttribute('src', imageAdress);
  expect(image).toBeInTheDocument();
});
