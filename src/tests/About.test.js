import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('Verifica se a página contém dois parágrafos com o texto sobre o pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = ('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    const secondParagraph = ('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    const firstParagraphFromHTML = getByText(firstParagraph);
    const secondParagraphFromHTML = getByText(secondParagraph);
    expect(firstParagraphFromHTML).toBeInTheDocument();
    expect(secondParagraphFromHTML).toBeInTheDocument();
  });

  it('Verifica se a pagina contém a imagem de um pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImage = getByRole('img');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
