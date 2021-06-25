import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 02 - Testa o componente <About />', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = render(<About />);
    const aboutTitle = getByText(/About Pokédex/);
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs).toContainHTML('p');
  });

  it('Teste se a página contém a imagem de uma Pokédex, através de um link.', () => {

  });
});
