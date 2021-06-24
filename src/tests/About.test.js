import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('verificando se contém informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutPage = getByText(/About Pokédex/i);
  expect(aboutPage).toBeInTheDocument();
});

it('verificando se contém um heading h2 com texto "About Pokédex"', () => {
  const { container } = renderWithRouter(<About />);

  const headerTwo = container.querySelector('h2');
  expect(headerTwo).toBeInTheDocument();
  expect(headerTwo.innerHTML).toBe('About Pokédex');
});

it('verificando se tem dois paragrafos no About', () => {
  const { container } = renderWithRouter(<About />);
  const parag = container.querySelectorAll('p');
  expect(parag.length).toBe(2);
});

it('verificando se a página contém a imagem de uma Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const img = container.querySelector('img');
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
