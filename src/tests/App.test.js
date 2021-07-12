import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente <App.js />', () => {
  it('Verifica se redireciona para URL / ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkToHome = getByText(/Home/i);
    fireEvent.click(linkToHome);
    const home = history.location.pathname;
    expect(home).toBe('/');
  });

  it('Verifica se redireciona para a URL /about ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkToAbout = getByText(/About/i);
    fireEvent.click(linkToAbout);
    const about = history.location.pathname;
    expect(about).toBe('/about');
  });

  it('Verifica se redireciona para a URL /favorites ao clicar no link Favorite Pokémons',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkToFavoritePokemons = getByText(/Favorite Pokémons/i);
      fireEvent.click(linkToFavoritePokemons);
      const favoritePokemons = history.location.pathname;
      expect(favoritePokemons).toBe('/favorites');
    });
});
