import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  it('página principal da Pokédex é renderizada /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Links devem possuir o texto "Home, About, Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('ao clicar na home principal da Pokédex é renderizada /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const linkHome = getByText('Home');
    fireEvent.click(linkHome);
    expect(pathname).toBe('/');
  });

  it('ao clicar about é renderizada /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('ao clicar Favorite Pokémons é renderizada /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorites = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('notfound ao entrar em página desconhecida', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not/found' });
    const pageNotFound = getByText(/not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
