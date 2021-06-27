import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { container } = render(<About />);

  const h2 = container.querySelectorAll('h2')[0];
  const p0 = container.querySelectorAll('p')[0];
  const p1 = container.querySelectorAll('p')[1];

  expect(h2.textContent).toContain('About Pokédex');
  expect(p0.textContent).toContain('This application simulates a Pokédex');
  expect(p1.textContent).toContain('One can filter Pokémons by type');
});

test('Teste se a página contém uma imagem específica de uma Pokédex', () => {
  const { container } = render(<About />);
  const img = container.querySelectorAll('img')[0];

  expect(img.src).toMatch('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
