import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('teste do componente About.js', () => {
  test('testa se a página contém tag h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);

    const titleElement = getByRole('heading', { level: 2 });
    expect(titleElement.innerHTML).toBe('About Pokédex');
  });

  test('testa se a página contém 2 parágrafos com o texto sobre Pokédex', () => {
    const { getAllByText } = render(<About />);

    const paragrapherElement = getAllByText(/Pokémons/i);
    expect(paragrapherElement.length).toEqual(2);
  });

  test('testa se a página contém imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
