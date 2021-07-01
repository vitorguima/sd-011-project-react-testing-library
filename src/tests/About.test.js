import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente About', () => {
  it('Verifica se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const info = getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  it('Verifica se a página contém um "h2" com o texto "About Pokémon"', () => {
    const { getByRole, getByText } = render(<About />);
    const checkHeading = getByRole('heading', { level: 2 });
    const title = getByText(/About Pokédex/i);
    expect(checkHeading).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(checkHeading.innerHTML).toMatch('About Pokédex');
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(url);
  });
});
