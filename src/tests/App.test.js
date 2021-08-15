import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('tests App component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('check Home Link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('check About Link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('check Favorite Pokemons Link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    expect(favoriteLink).toBeInTheDocument();
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('check Not Found Page for random links', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/whatever');
    const error = getByAltText('Pikachu crying because the page requested was not found');
    expect(error).toBeInTheDocument();
  });
});
