import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testes relativos ao componente About', () => {
  const h2 = 'About Pokédex';

  it('Verifica se o componente About renderiza o h2 "About Pokédex"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    expect(getByText(h2)).toBeInTheDocument();
  });

  it('Verifica se a página tem a imagem correta', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it('Verifica se a página tem 2 parágrafos sobre a Pokédex', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });
});

/* it('verifica se, ao clicar nos favoritos o site renderiza os favoritos', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const favorite = getByText(favoritePoks);

  fireEvent.click(favorite);
  expect(getByText(favoritePoks)).toBeInTheDocument();
}); */
