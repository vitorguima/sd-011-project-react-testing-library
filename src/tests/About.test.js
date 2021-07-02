import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const pokedexInfo = getByText(/This application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading');
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const paragraphs = container.getElementsByTagName('p');
    expect(paragraphs).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { container } = render(<About />);
    const image = container.querySelector('.pokedex-image');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
