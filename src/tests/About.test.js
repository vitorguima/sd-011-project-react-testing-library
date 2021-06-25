import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testes do componente About', () => {
  it('Verifica e a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const infoPokedex = getByText(/This application simulates a Pokédex/);
    expect(infoPokedex).toBeInTheDocument();
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText, getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const title = getByText('About Pokédex');
    expect(title).toBeInTheDocument();
  });

  it('Verifica e a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/);
    expect(p1).toBeInTheDocument();
    const p2 = getByText(/One can filter Pokémons by type/);
    expect(p2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagePokedex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imagePokedex);
  });
});
