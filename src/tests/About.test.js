import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js /.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { container, getByText } = render(<About />);
    const tagH2 = container.querySelector('h2');
    const textH2 = getByText('About Pokédex');
    expect(tagH2).toBeInTheDocument();
    expect(textH2).toBeInTheDocument();
  });

  test('este se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const tagP1 = container.querySelectorAll('p')[0];
    const tagP2 = container.querySelectorAll('p')[1];
    expect(tagP2).toBeInTheDocument();
    expect(tagP1).toBeInTheDocument();
  });
  test('Teste se a página contém uma imagem de uma Pokédex', () => {
    const { container } = render(<About />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
