import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokedex = getByText('About Pokédex');

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2Container = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(h2Container).toBeInTheDocument();
  });

  it('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');

    expect(paragraph.length).toBe(2);
  });

  it('Se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = render(<About />);
    const pokedexImg = getByAltText('Pokédex');
    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
