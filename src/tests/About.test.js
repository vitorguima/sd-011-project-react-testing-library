import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

const pokedexInfoOne = 'This application simulates a Pokédex, a '
+ 'digital encyclopedia containing all Pokémons';
const pokedexInfoTwo = 'One can filter Pokémons by type, '
  + 'and see more details for each one of them';
const pokedexImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Teste o componente <About.js /.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const infoOne = getByText(pokedexInfoOne);
    const infoTwo = getByText(pokedexInfoTwo);
    expect(infoOne).toBeInTheDocument();
    expect(infoTwo).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading');
    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML).toBe('About Pokédex');
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      const { container } = renderWithRouter(<About />);
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBe(2);
    });
  it(`Teste se a página contém a seguinte imagem de uma Pokédex: ${pokedexImage}`, () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe(pokedexImage);
  });
});
