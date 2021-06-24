import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  test('Pagina contem informações sobre a pokedex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Contem texto h2 com About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const h2Text = getByText('About Pokédex');
    expect(h2Text).toBeInTheDocument();
  });

  test('Contem 2 paragrafos com texto sobre a pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstP = getByText(/application simulates a Pokédex/);
    const secondP = getByText(/can filter Pokémons by type, and see more details/);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  test('Contem uma imagem especifica', () => {
    renderWithRouter(<About />);
    const myImgHtml = document.querySelector('img');
    expect(myImgHtml.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
