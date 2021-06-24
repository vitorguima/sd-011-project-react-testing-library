import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 02', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { container } = render(<About />);
    const element = container.querySelector('h2');
    expect(element.textContent).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const element = container.querySelectorAll('p');
    expect(element.length).toBe(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const { container } = render(<About />);
    const element = container.querySelector('img');
    expect(element.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
