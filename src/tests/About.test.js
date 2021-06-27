import React from 'react';
import { About } from '../components';
import RenderWithRouter from '../RenderWithRouter';

describe('Testa o componente About', () => {
  it('Verifica se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = RenderWithRouter(<About />);
    const someInformation = getByText(/About Pokédex/i);
    expect(someInformation).toBeInTheDocument();
  });
  it('Verifica heading h2 com o texto About Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const h2Title = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2Title).toBeInTheDocument();
  });
  it('Verifica dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = RenderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });
  it('Verifica imagem de uma Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
