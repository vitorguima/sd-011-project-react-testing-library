import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testa o componente <About.js /.', () => {
  const paragraph = {
    one: 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons',
    two: 'One can filter Pokémons by type, and see more details for each one of them',
  };
  it('se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = render(<About />);
    const home = getByText(/About Pokédex/);
    expect(home).toBeInTheDocument();
  });
  it('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const firstParagraph = getByText(paragraph.one);
    const secondParagraph = getByText(paragraph.two);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('se a página contém uma imagem de uma Pokédex', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
