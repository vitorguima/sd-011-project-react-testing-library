import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste da página "About"', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const heading = getByText(/This application simulates a Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraph = document.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  test('Teste se a página contém a imagem com um link específico', () => {
    const { getByRole } = renderWithRouter(<About />);

    const img = getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
