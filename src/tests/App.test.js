import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const expectedHomePageTitle = 'Encountered pokémons';
const expectedAboutPageTitle = 'About Pokédex';
const expectedFavoritePageTitle = 'Favorite pokémons';
const expectedNotFoundPageTitle = 'Page requested not found';

describe('App.js:', () => {
  it('Main page should be loaded when path / is accessed.', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeTitle = getByText(expectedHomePageTitle);

    expect(homeTitle).toBeInTheDocument();
    expect(homeTitle.textContent).toBe(expectedHomePageTitle);
  });

  it('There should be navigation links in the of the page.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const actualNavigationLinks = Array.from(getByRole('navigation').children);
    const expectedNavigationLinks = ['Home', 'About', 'Favorite Pokémons'];

    expect(actualNavigationLinks.length).toBe(expectedNavigationLinks.length);
    actualNavigationLinks.forEach((link, index) => {
      expect(link.textContent).toBe(expectedNavigationLinks[index]);
    });
  });

  it('User should be redirected to Home page when the \'Home\' link is clicked.', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const navBar = getByRole('navigation');
    const homeNavLink = within(navBar).getByText('Home');

    fireEvent.click(homeNavLink);

    const homeTitle = getByText(expectedHomePageTitle);

    expect(history.location.pathname).toBe('/');
    expect(homeTitle).toBeInTheDocument();
    expect(homeTitle.textContent).toBe(expectedHomePageTitle);
  });

  it('User should be redirected to About page when the \'About\' link is clicked.',
    () => {
      const { getByRole, getByText, history } = renderWithRouter(<App />);
      const navBar = getByRole('navigation');
      const aboutNavLink = within(navBar).getByText('About');

      fireEvent.click(aboutNavLink);

      const aboutTitle = getByText(expectedAboutPageTitle);

      expect(history.location.pathname).toBe('/about');
      expect(aboutTitle).toBeInTheDocument();
      expect(aboutTitle.textContent).toBe(expectedAboutPageTitle);
    });

  it('User should be redirected to Favorite Pokémons page when '
      + 'the \'Favorite Pokémons\' link is clicked.',
  () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const navBar = getByRole('navigation');
    const favoriteNavLink = within(navBar).getByText('Favorite Pokémons');

    fireEvent.click(favoriteNavLink);

    const favoriteTitle = getByText(expectedFavoritePageTitle);

    expect(history.location.pathname).toBe('/favorites');
    expect(favoriteTitle).toBeInTheDocument();
    expect(favoriteTitle.textContent.trim()).toBe(expectedFavoritePageTitle);
  });

  it('User should be redirected to 404 page if an inexistent path is accessed.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/page-that-does-not-exist');

    const notFoundTitle = getByText(expectedNotFoundPageTitle);

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundTitle.textContent).toBe(`${expectedNotFoundPageTitle} 😭`);
  });
});
