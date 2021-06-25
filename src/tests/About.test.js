import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Testa se contém heading h2 com texto About Pokédex', () => {
    const { container } = render(<About />);
    const headingh2 = container.querySelector('h2');
    expect(headingh2.textContent).toBe('About Pokédex');
  });

  test('Testa se contém 2 parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Testa se contém imagem da Pokédex', () => {
    const { container } = render(<About />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
