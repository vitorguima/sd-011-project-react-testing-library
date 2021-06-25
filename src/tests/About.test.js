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
    const { getByRole } = renderWithRouter(<About />);
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(getByRole('img')).toHaveAttribute('src', imageSrc);
  });
});
