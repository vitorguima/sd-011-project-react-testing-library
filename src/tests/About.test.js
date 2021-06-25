import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando componente About - R2', () => {
  it('Verifica se a página contém info sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const text = getByText(/This application simulates/);
    expect(text).toBeInTheDocument();
  });
  it('Verifica se a página contém h2 com About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { name: /About Pokédex/ });
    expect(title).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const numberP = getAllByText(/Pokémons/);
    expect(numberP.length).toEqual(2);
  });
  it('Teste se a página contém a img.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
