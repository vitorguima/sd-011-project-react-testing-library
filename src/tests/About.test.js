import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <About.js /.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeading = getByRole('heading', { level: 2 });
    expect(aboutHeading).toBeInTheDocument();
    expect(aboutHeading).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const aboutParagraph = getAllByText(/Pokémons/i);
    expect(aboutParagraph.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutImg = getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
