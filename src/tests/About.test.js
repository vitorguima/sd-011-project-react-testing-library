import React from 'react';
import About from '../components/About';

import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js /.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutOnly = getByText(/This application simulates a Pokédex/);
    expect(aboutOnly).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOne = getByText(/This application simulates a Pokédex/);
    const paragraphTwo = getByText(/One can filter Pokémons by type/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText(/Pokédex/);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
