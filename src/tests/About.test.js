import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente About', () => {
  test('Teste se a página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pokedex = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(pokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto', () => {
    const { getByText } = renderWithRouter(<About />);

    const p1 = getByText(/This application simulates a Pokédex/);
    const p2 = getByText(/One can filter Pokémons by type/);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('Teste se a página contém imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const img = getByRole('img');

    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
