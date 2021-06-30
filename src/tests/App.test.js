import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { render } from '@testing-library/react';
import App from '../App';

describe('testes componente App.js', () => {
  it('testa se a página inicial é renderizada ao carregar "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText(/Encountered Pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favoritePokemons = getByText(/favorite pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
});
