import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testing the App component', () => {
  describe('Testing if App is rendered on URL "/"', () => {
    it('Testing if App is rendered on URL "/"', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const home = getByText(/Home/i);
      fireEvent.click(home);
      const homePath = history.location.pathname;
      expect(homePath).toBe('/');
    });

    it('Testing if About page is rendered on /about', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const about = getByText(/About/i);
      fireEvent.click(about);
      const aboutPath = history.location.pathname;
      expect(aboutPath).toBe('/about');
    });

    it('Verifying if Favorite Pokémons is rendered on /favorites', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favorites = getByText(/Favorite Pokémons/i);
      fireEvent.click(favorites);
      const favoritePath = history.location.pathname;
      expect(favoritePath).toBe('/favorites');
    });
  });
});
