import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Requisito 2 - About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = render(<About />);
    const headingH2 = getByText(/About Pokédex/i);
    expect(headingH2).toBeInTheDocument();
  });

  it('Teste se a página contém 2 parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const paragrafos = container.querySelectorAll('p');
    expect(paragrafos.length).toBe(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = render(<About />);
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img');
    expect(image.src).toBe(imageUrl);
  });
});
