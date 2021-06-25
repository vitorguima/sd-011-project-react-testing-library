import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingText = getByRole('heading', { level: 2 });
    expect(headingText.innerHTML).toBe('About Pokédex');
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstText = ('This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons');
    const secondText = ('One can filter Pokémons by type, '
      + 'and see more details for each one of them');
    const firstParagraph = getByText(firstText);
    const secondParagraph = getByText(secondText);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutImage = getByRole('img');
    expect(aboutImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/'
      + '8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
