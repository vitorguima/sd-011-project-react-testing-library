import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente App.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoPokedex = document.getElementsByTagName('p');

    expect(infoPokedex.length[1]).toBe();
  });

  test('Teste se a página contém um heading h2 com o texto \'About Pokédex\'', () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoPokedex = document.getElementsByTagName('p');

    expect(infoPokedex.length).toBe(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgPokedex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image.src).toBe(imgPokedex);
  });
});
