import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testa informações no /About', () => {
  test('Testa o header', () => {
    const { getByText } = render(<About />);
    const Header = getByText(/about pokédex/i);
    expect(Header).toBeInTheDocument();
  });
  test('Testa se a página contém dois parágrafos', () => {
    const { getAllByRole } = render(<About />);
    const ParagraphArray = getAllByRole('paragraph');
    expect(ParagraphArray.length).toBe(2);
  });
  test('Testa a imagem pokédex', () => {
    const { getByAltText, container } = render(<About />);
    const PokeImg = getByAltText('Pokédex');
    const ImgPoke = container.querySelector('img').src;
    expect(PokeImg).toBeInTheDocument();
    expect(ImgPoke).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
