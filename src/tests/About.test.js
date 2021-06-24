import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente About', () => {
  it('Verifica se a página contém as informações da Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const contentText = getByText(/About Pokédex/);
    expect(contentText).toBeInTheDocument();
  });

  it('Verifica se a página contém um heading "h2"', () => {
    render(<About />);
    const headingPage = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(headingPage).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph[0].value).toBe();
    expect(paragraph[1].value).toBe();
    expect(paragraph.length).toBe(2);
  });

  it('Verifica se a página contém uma imagem da Pokédex', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
