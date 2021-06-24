import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente About', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex, a digital/i);
    const paragraph2 = getByText(/One can filter Pokémons by type, and see more/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  /* https://testing-library.com/docs/queries/byalttext/ */
  /* https://github.com/testing-library/jest-dom#tohaveattribute */
  it('Verifica se contém imagem de alguma imagem pokedex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imgPokedex = getByAltText(/Pokédex/i);
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
