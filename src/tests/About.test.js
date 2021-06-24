// import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    /** Verifica se há alguns textos na página de informações. */
    const aboutp1 = getByText(/This application simulates a Pokédex/i);
    const aboutp2 = getByText(/and see more details for each one of them/i);
    expect(aboutp1).toBeInTheDocument();
    expect(aboutp2).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const h2 = container.querySelector('h2').innerHTML;
    expect(h2).toBe('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.getElementsByTagName('p');
    expect(paragraphs).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    /** Consultado um tópico em StackOverFlow relacionado à atributo src e como usá-lo.
     * Source: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src */
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { container } = renderWithRouter(<About />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', url);
  });
});
