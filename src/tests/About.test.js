import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByRole } = render(<About />);
    const info = getByRole('heading', { level: 2 });
    expect(info).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const parag = container.querySelectorAll('h2');
    expect(parag.length).toBe(1);
  });

  it('Teste se a página contém a seguinte URL de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toContain(url);
  });
});
