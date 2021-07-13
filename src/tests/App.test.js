import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test all App component', () => {
  test('if renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('if renders Pokédex page with `/` path', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    const { pathname } = history.location;

    expect(heading).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  test('if contains 3 links on the top', () => {
    const { getAllByRole } = renderWithRouter(<App />);

    const links = getAllByRole('link');
    const { length } = links;

    expect(links).toHaveLength(length);
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('if `Home` link redirects to `/` url', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const homeLink = getAllByRole('link')[0];
    expect(homeLink).toHaveTextContent('Home');
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if `About` link redirects to `/about` url', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const aboutLink = getAllByRole('link')[1];
    expect(aboutLink).toHaveTextContent('About');
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if `Favorites` link redirects to `/favorites` url', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const favoritesLink = getAllByRole('link')[2];
    expect(favoritesLink).toHaveTextContent('Favorite Pokémons');
    fireEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if renders NotFound component when when there isnt route for url', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    let notFound = queryByText(/not found/i);
    expect(notFound).toBeNull();
    history.push('/xablau');
    notFound = queryByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
