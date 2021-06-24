import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste componente <About.js />', () => {
  it('Contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const title = getByText(/About Pokédex/);
    expect(title).toBeInTheDocument();
  });

  it('Contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  // https://testing-library.com/docs/queries/about/
  it('Contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('Contém determinada imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(url);
  });
});
