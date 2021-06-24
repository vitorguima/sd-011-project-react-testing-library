import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../components';

describe('Verifica requisito 2', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const info = screen.getByText(/About Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/simulates a Pokédex/i);
    const p2 = screen.getByText(/more details for each/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByAltText(/Pokédex/i);
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
