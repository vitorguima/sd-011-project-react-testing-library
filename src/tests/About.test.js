import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const text = getByText(/This application simulates a Pokédex/);
    expect(text).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { container } = render(<About />);
    const checkH2 = container.querySelector('h2');
    expect(checkH2.textContent).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = render(<About />);
    const checkP = getAllByText(/Pokémons/);
    expect(checkP.length).toEqual(2);
  });

  it('Teste se a página contém dois parágrafos com querySelectorAll', () => {
    const { container } = render(<About />);
    const checkP = container.querySelectorAll('p');
    expect(checkP.length).toEqual(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = render(<About />);
    const chechImg = getByRole('img');
    expect(chechImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
