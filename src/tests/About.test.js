import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <About />', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/This application simulates/)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons/)).toBeInTheDocument();
  });
  it('Testa se a página contém uma imagem de uma Pokédex.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText('Pokédex')).toBeInTheDocument();
  });
});
