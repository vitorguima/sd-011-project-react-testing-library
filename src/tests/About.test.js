import React from 'react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('testa se a página exibe as informações sobre a pokedex', () => {
  it('testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(heading).toBeInTheDocument();
  });

  it('testa se a página contem dois paragrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');

    expect(paragraphs.length).toBe(2);
  });

  it('testa se a imagem correta é renderizada na página', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const href = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', href);
  });
});
