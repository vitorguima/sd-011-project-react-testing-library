import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App tests', () => {
  test('Tests if pokedex homepage renders in "/"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Tests if the top of the application contains a fixed set of navigation links',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const innerText = screen.getAllByRole('link');
      expect(innerText[0].innerHTML).toBe('Home');
      expect(innerText[1].innerHTML).toBe('About');
      expect(innerText[2].innerHTML).toBe('Favorite Pokémons');
    });

  test('Tests if clicking the Home Link redirects to the home page at "/"',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const home = getByText('Home');
      fireEvent.click(home);
      expect(history.location.pathname).toBe('/');
    });

  test('Tests if the application changes to "/about" when clicking the link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const about = getByText('About');
      fireEvent.click(about);
      expect(history.location.pathname).toBe('/about');
    });

  test('Tests if the application changes to "/favorites" when clicking the link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favorites = getByText('Favorite Pokémons');
      fireEvent.click(favorites);
      expect(history.location.pathname).toBe('/favorites');
    });

  test('Tests if the application changes to "Not found" when clicking an unknown link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('not-found');
      const notFound = getByText(/Page requested not found/);
      expect(notFound).toBeInTheDocument();
    });
});
