import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2 - Teste o componente <About/>', () => {
  it('Teste se a página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<About />);
    const element = getByRole('heading', { name: 'About Pokédex' });
    expect(element).toBeInTheDocument();
  });

  it('Teste se a página contém 2 paragrafos de texto', () => {
    const { getByText } = renderWithRouter(<About />);
    const text1 = getByText(`This application simulates a Pokédex,
     a digital encyclopedia containing all Pokémons`);
    expect(text1).toBeInTheDocument();
    const text2 = getByText(`One can filter Pokémons by type,
     and see more details for each one of them`);
    expect(text2).toBeInTheDocument();
  });

  it('Teste se a página contém uma imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
