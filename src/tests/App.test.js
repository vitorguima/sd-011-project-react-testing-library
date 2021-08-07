import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1 - Teste o componente <App.js />', () => {
  test('Teste se a página principal da Pokédex é renderizada em /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const rota = '/';
    history.push(rota);
    const homePokedex = getByText(/Encountered pokémons/);
    expect(homePokedex).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém os links de navegação.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: 'Home' });
    const linkAbout = getByRole('link', { name: 'About' });
    const linkFavorite = getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Aplicação é redirecionada para a página / ao clicar em Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: 'Home' });
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Aplicação é redirecionada para a página /about ao clicar em About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkAbout = getByRole('link', { name: 'About' });
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Redirecione para a /favorites ao clicar em Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkFavorite = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Redirecione para página Not Found ao entrar com URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pathname = '/notfound';
    history.push(pathname);
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
