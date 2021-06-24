import React from 'react';
// import { fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa se a página About contém as informações sobre a Pokédex', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);

    expect(paragraphs[0].innerHTML).toMatch(/Poké/i);
    expect(paragraphs[1].innerHTML).toMatch(/Poké/i);
  });

  it('Testa se a página contém uma imagem específica de Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImg = container.querySelector('img');
    expect(pokedexImg.src).toBe(imgSrc);
  });
});
