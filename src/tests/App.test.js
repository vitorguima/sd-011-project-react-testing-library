import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('', () => {
  test('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />, ['/']);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test(`Check that the top of the application
  contains a fixed set of navigation links`, () => {
    const { container } = renderWithRouter(<App />);

    const tagNav = container.querySelector('nav');
    const tagAnchor = tagNav.querySelectorAll('a');
    const numberOfAnchorInsideTagNavExpected = 3;

    expect(tagAnchor.length).toBe(numberOfAnchorInsideTagNavExpected);
    expect(tagAnchor[0].textContent).toBe('Home');
    expect(tagAnchor[1].textContent).toBe('About');
    expect(tagAnchor[2].textContent).toBe('Favorite Pokémons');
  });

  test(`Checks if the application is directed to the 'home' page,
  in the URL '/' when clicking the Home link in the navigation bar.`, () => {
    const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);
    const { click } = fireEvent;

    const linkHomePage = getByText(/home/i);
    click(linkHomePage);

    const homeUrl = pathname;
    expect(homeUrl).toBe('/');
  });

  test(`Checks if the application is directed to the 'about' page,
  in the URL '/about', by clicking on the 'about' link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { click } = fireEvent;

    const linkAboutPage = getByText(/About/i);
    click(linkAboutPage);

    const aboutUrl = history.location.pathname;
    expect(aboutUrl).toBe('/about');
  });

  test(`Checks if the application is directed to the 'Favorite Pokemons' page,
  in the URL '/favorites', by clicking on the 'Favorite Pokemons' 
  link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { click } = fireEvent;

    const linkFavorites = getByText(/Favorite Pokémons/i);
    click(linkFavorites);

    const favoritesUrl = history.location.pathname;
    expect(favoritesUrl).toBe('/favorites');
  });
});
