// import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testas os elementos do componente about, 2 requisito.', () => {
  it('Testa se a página contém informacões sobre a pokedex', () => {
    const { getByText } = render(<About />);
    const text = /This application simulates/i;

    expect(getByText(text)).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading');

    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/);

    expect(paragraphs.length).toBe(2);
  });

  it('Verifiá se a página possui a imagem especificada', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
