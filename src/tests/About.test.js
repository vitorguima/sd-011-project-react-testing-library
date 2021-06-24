import React from 'react';
import { render } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o componente <About.js /.', () => {
  it('se a página contém as informações sobre a Pokédex.', () => {
    const { getByTestId } = render(<About />);
    const infoPokedex = getByTestId('infoPokedex');
    expect(infoPokedex).toBeInTheDocument();
  });
  it('se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = render(<About />);
    const home = getByText(/About Pokédex/);
    expect(home).toBeInTheDocument();
  });
  it('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByTestId } = render(<About />);
    const firstParagraph = getByTestId('paragraphOne');
    const secondParagraph = getByTestId('paragraphTwo');
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('se a página contém uma imagem de uma Pokédex', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
