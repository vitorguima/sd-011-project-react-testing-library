import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

it('Teste se a página contém as informações sobre a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const firstP = container.querySelectorAll('p')[0].textContent;
  expect(firstP).toContain('This application simulates a Pokédex');

  const secondP = container.querySelectorAll('p')[1].textContent;
  expect(secondP).toContain('One can filter Pokémons by type');
});

it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const headingTwo = getByRole('heading', { level: 2 });

  expect(headingTwo.textContent).toBe('About Pokédex');
});

it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const ps = container.querySelectorAll('p');
  expect(ps.length).toBe(2);
});

it('Teste se a página contém a imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
