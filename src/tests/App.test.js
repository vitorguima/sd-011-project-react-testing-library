import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente App', () => {
  it('Página principal é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { history } = renderWithRouter(<App />);

    const pathHome = history.location.pathname;
    expect(pathHome).toBe('/');
  });
  it('Topo da aplicação contém esses conjunto de link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkHome = getByText(/home/i);
    const linkAbout = getByText(/about/i);
    const linkFavorite = getByText(/favorite pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  it('A aplicação é redirecionada para página inicial, na URL / ao clicar no link Home',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkHome = getByText(/home/i);
      fireEvent.click(linkHome);

      const pathHome = history.location.pathname;
      expect(pathHome).toBe('/');
    });
  it('A aplicação é redirecionada para page About, na URL /about ao clicar no link About',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkAbout = getByText(/about/i);
      fireEvent.click(linkAbout);

      const pathAbout = history.location.pathname;
      expect(pathAbout).toBe('/about');
    });
  it('App muda p/ pag Pokémons Favoritados, na URL /favorites ao clicar no link Favorite',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkFavorite = getByText(/favorite pokémons/i);
      fireEvent.click(linkFavorite);

      const pathFavorite = history.location.pathname;
      expect(pathFavorite).toBe('/favorites');
    });
  it('App é redirecionada para a página Not Found ao entrar em uma URL desconhecida',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      history.push('/vaiferrar/oteste');
      const noMatch = getByText(/page requested not found/i);

      expect(noMatch).toBeInTheDocument();
    });
});
