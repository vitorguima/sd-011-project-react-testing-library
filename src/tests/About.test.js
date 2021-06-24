import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('2 - Testa o componente <About.js />', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(
      /This application simulates a Pokédex/, // regex utilizada para dar match com apenas parte do texto por conta do numero de linhas do linter.
    );
    const secondParagraph = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Testa se a página contém uma imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
