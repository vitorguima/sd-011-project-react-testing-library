import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { container } = render(<About />);
    const tagh2 = container.querySelector('h2');
    expect(tagh2.textContent).toBe('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Teste se a página contém uma imagem da Pokédex já definida', () => {
    const { container } = render(<About />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
