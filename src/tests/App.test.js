import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test whether the homepage has certain elements', () => {
  it('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('Test whether the top of the application contains a fixed set of navigation links',
    () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('Home')).toBeInTheDocument();
      expect(getByText('About')).toBeInTheDocument();
      expect(getByText('Favorite Pokémons')).toBeInTheDocument();
    });
});

describe('Test interactions on NavBar', () => {
  it('Test if the application is taken to the home page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const homeRedirect = getByText('Home');
      history.push('/about');
      fireEvent.click(homeRedirect);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  it('Test if the application is redirected to the About page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const aboutRedirect = getByText('About');
      fireEvent.click(aboutRedirect);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  it('Test if the application is redirected to the favorites page',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favoritesRedirect = getByText('Favorite Pokémons');
      fireEvent.click(favoritesRedirect);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
});
