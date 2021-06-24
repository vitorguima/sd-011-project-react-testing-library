import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('When render APP', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('show 3 links in top of page', () => {
    const { getByText } = renderWithRouter(<App />);
    const firstLink = getByText('Home');
    const secondLink = getByText('About');
    const thirdlink = getByText('Favorite Pokémons');
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdlink).toBeInTheDocument();
  });

  it('Show home when click in link "Home"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Show About when click in link "About"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Show Pokemons Favoritos when click in link "Favorite Pokémons"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Show NotFound Favoritos when pathname is unknow', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-errada');
    const errorPage = getByText(/Page requested not found/i);
    expect(errorPage).toBeInTheDocument();
  });
});
