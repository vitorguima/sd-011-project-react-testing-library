import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testa as informarções sobre a Pokedex', () => {
  it('Testa se a página tem um h2 com o texto About Pokedex', () => {
    const { container } = render(<About />);
    const headerPage = container.querySelector('h2');
    expect(headerPage.textContent).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  it('Será verificado se renderiza a imagem de uma pokedéx', () => {
    const pokedexImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { container } = render(<About />);
    const imageSource = container.querySelector('.pokedex-image');
    expect(imageSource.src).toBe(pokedexImage);
  });
});
