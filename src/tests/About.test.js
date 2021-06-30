import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Testa se a página contém informações sobre a Pokédex', () => {
  const { container } = render(
    <About />,
  );
  expect(container.querySelector('.pokedex-image')).toBeInTheDocument();
});

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  const { container } = render(
    <About />,
  );
  const head = container.querySelector('h2');
  expect(head).toHaveTextContent('About Pokédex');
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(
    <About />,
  );
  const paragraph = container.querySelectorAll('p');
  expect(paragraph.length === 2).toBe(true);
});

test('Testa se a página contém a imagem de uma Pokédex', () => {
  const { getByAltText } = render(
    <About />,
  );
  const image = getByAltText('Pokédex');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
