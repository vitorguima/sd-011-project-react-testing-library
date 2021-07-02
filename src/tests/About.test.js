import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Componente </About>', () => {
  it('Verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { container } = render(<About />);
    const h2 = container.querySelector('h2');

    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');

    expect(p).toHaveLength(2);
    p.forEach((pp) => expect(pp).toHaveTextContent(/./));
  });

  it('Verifica se a página contém uma imagem com URL específica', () => {
    const { container } = render(<About />);
    const img = container.querySelector('img');
    const givenURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(givenURL);
  });
});
