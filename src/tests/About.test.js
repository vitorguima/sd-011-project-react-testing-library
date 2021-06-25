import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    expect(getByText(/This application simulates a Pokédex/)).toBeInTheDocument();
    // Se colocar o começo da frase já reconhece o resto...
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole, getByText } = render(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = render(<About />);
    expect(getAllByText(/Pokémons/).length).toEqual(2);
    // Usei getAllByText pois espero mais de um elemento com a palavra Pokémons.
    // No caso 2 elementos.
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
