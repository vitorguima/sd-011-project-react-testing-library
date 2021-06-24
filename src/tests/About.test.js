import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
// import renderWithRouter from '../RenderWithRouter';

describe('tests about', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const title = getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph).toHaveLength(2);
  });

  test('Teste se a página contém uma imagem', () => {
    const { container } = render(<About />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
