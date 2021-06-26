import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 02', () => {
  test('a página deve conter um h2 com o texto `About Pokédex`', () => {
    const { getByRole } = render(<About />);
    const title = getByRole('heading', { level: 2 });
    expect(title.innerHTML).toBe('About Pokédex');
  });

  test('Deve conter dois paragráfos com o texto sobre Pokédex', () => {
    const { getAllByText } = render(<About />);
    const paragrapher = getAllByText(/Pokémons/i);
    expect(paragrapher.length).toEqual(2);
  });

  test('Deve conter uma imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
