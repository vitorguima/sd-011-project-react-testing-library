import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste do componente About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    // Acessar os elementos da tela
    const { getByText } = render(<About />);
    const information = getByText(/One can filter Pokémons by type/i);
    // Fazer o teste
    expect(information).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // Acessar os elementos da tela
    const { getByRole } = render(<About />);
    const headingH2 = getByRole('heading');
    // Fazer o teste
    expect(headingH2.textContent).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // Acessar os elementos da tela
    const { container } = render(<About />);
    const texts = container.getElementsByTagName('p');
    // Fazer o teste
    expect(texts).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    // Acessar os elementos da tela
    const { container } = render(<About />);
    const img = container.querySelector('.pokedex-image');
    // Fazer o teste
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
