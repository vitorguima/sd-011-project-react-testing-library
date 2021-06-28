import React from 'react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('Testando componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/This application simulates a Pokédex, a digital/);
    expect(info).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', { name: /About Pokédex/ });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex, a digital/);
    const paragraph2 = getByText(/One can filter Pokémons by type, and see more details/);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(imgUrl);
  });
});
