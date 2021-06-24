import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex. e 2 paragrafos', () => {
    const { container } = renderWithRouter(<About />);
    const pPokedex = container.querySelectorAll('p');
    expect(pPokedex.length).toBe(2);
    expect(pPokedex[0].textContent).toContain('This application simulates a Pokédex');
    expect(pPokedex[1].textContent).toContain('One can filter Pokémons by type');
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const titlePokedex = container.querySelector('h2');
    expect(titlePokedex.textContent).toContain('About Pokédex');
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagePokedex = container.querySelector('img');
    expect(imagePokedex.src).toContain(imageURL);
  });
});
