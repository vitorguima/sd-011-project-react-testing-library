import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('testa se a página contém informações da Pokédex', () => {
    const { getByText } = render(<About />);
    const info = getByText(/This application simulates/i);
    expect(info).toBeInTheDocument();
  });

  it('testa se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { getByText, getByRole } = render(<About />);
    const testh2 = getByRole('heading', { level: 2 });
    const textTitle = getByText(/About Pokédex/i);
    expect(testh2).toBeInTheDocument();
    expect(testh2.innerHTML).toMatch('About Pokédex');
    expect(textTitle).toBeInTheDocument();
  });

  it('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('testa se a página contém a imagem da Pokédex', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(imgUrl);
  });
});
