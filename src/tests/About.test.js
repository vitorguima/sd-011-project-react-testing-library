import React from 'react';
import { getByAltText, screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Bateria de testes referente ao componente About', () => {
  test('Verifica se a página contém um heading h2', () => {
    const { container } = renderWithRouter(<About />);

    const tagHeading = container.querySelector('h2');
    expect(tagHeading).toBeInTheDocument();
  });

  test('Verifica se existe um título com o texto "About PokéDex"', () => {
    renderWithRouter(<About />);

    const titleOfPage = screen.queryByText(/about pokédex/i);
    expect(titleOfPage).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const tagParagraph = container.querySelectorAll('p');
    const numberOfParagraphExpected = 2;

    expect(tagParagraph.length).toBe(numberOfParagraphExpected);
    expect(tagParagraph[0].textContent.length).toBeGreaterThan(0);
    expect(tagParagraph[1].textContent.length).toBeGreaterThan(0);
  });

  test('Verifica se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageOfPokedex = screen.getByAltText('Pokédex');
    expect(imageOfPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
