import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente About', () => {
  it('Verifica se a página contém as informações sobre a Pokedéx e 2 p\'s', () => {
    const { container } = renderWithRouter(<About />);
    const aboutPokedex = container.querySelectorAll('p');
    expect(aboutPokedex.length).toBe(2);
    expect(aboutPokedex[0].textContent).toContain('This application simulates a Pokédex');
    expect(aboutPokedex[1].textContent).toContain('One can filter Pokémons by type');
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokedex', () => {
    const { container } = renderWithRouter(<About />);
    const headingH2 = container.querySelector('h2');
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.textContent).toBe('About Pokédex');
  });

  it('Verifica se a página contém uma imagem de uma pokedéx', () => {
    const { container } = renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = container.querySelector('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.getAttribute('src')).toBe(imgURL);
  });
});
