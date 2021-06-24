import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

it('Teste se a página App contém um H2', () => {
  const { container } = render(<About />);
  const titlePage = container.querySelector('h2');
  expect(titlePage.textContent).toBe('About Pokédex');
});

it('Teste se apresenta os paragrafos', () => {
  const { container } = render(<About />);
  const paragraph = container.querySelectorAll('p');
  expect(paragraph.length).toBe(2);
});

it('Teste se apresenta a imagem com o link em questão', () => {
  const { container } = render(<About />);
  const imageSource = container.querySelector('.pokedex-image');
  expect(imageSource.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
