import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);

    const infoPokedex = screen.getByText(/this application simulates a pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);

    const paragraphPokedex = container.querySelectorAll('p');
    expect(paragraphPokedex.length).toBe(2);
  });
  it('Teste se a página contém uma imagem de uma Pokédex', () => {
    render(<About />);
    const imgPokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', 'alt', 'Pokédex');
  });
});
