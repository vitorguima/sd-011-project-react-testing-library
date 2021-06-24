import React from 'react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pParagraph = getByText(/This application simulates a Pokédex/);
    expect(pParagraph).toBeInTheDocument();
    const sParagraph = getByText(/One can filter Pokémons by type/);
    expect(sParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { container, getByText } = renderWithRouter(<About />);
    const tag = container.querySelector('h2');
    expect(tag).toBeInTheDocument();
    const text = getByText(/About Pokédex/);
    expect(text).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
