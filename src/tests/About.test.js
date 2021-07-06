import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About tests', () => {
  test('Verifica se existe h2 com o texto "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const textH2 = getByRole('heading');

    expect(textH2.textContent).toBe('About Pokédex');
  });

  test('Verifica se a página possue dois p com texto sobre a pokedex', () => {
    const { container } = render(<About />);
    const texts = container.getElementsByTagName('p');

    expect(texts).toHaveLength(2);
  });

  test('Verifica se a página contem imagem', () => {
    const { container } = render(<About />);
    const imagemSrc = container.querySelector('.pokedex-image');

    expect(imagemSrc.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
