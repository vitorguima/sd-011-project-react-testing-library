import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Checa se a página contém informações sobre a Pokedéx', () => {
  it('renderiza um título `About Pokédex`', () => {
    const { getByText } = render(<About />);
    const title = getByText(/About Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  it('renderiza dois parágrafos com texto', () => {
    render(<About />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('renderiza a imagem apropriada', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = document.querySelector('img');
    expect(image.src).toBe(url);
  });
});
