import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes do componente <About.js />', () => {
  it('A página contém informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const subtitle = getByText(/This application simulates a Pokédex/);

    expect(subtitle).toBeInTheDocument();
  });

  it('A página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', { level: 2 }).innerHTML;

    expect(h2).toBe('About Pokédex');
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/);
    const p2 = getByText(/One can filter Pokémons by type/);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('A página contém uma imagem especifica', () => {
    const { getByRole } = renderWithRouter(<About />);
    const { src } = getByRole('img');

    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Acessar os elementos da tela
// Interagir com eles (se houver necessidade)
// Fazer teste
