import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Testing App component', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('test if Home link takes to the route `/`', () => {
    let testLocation;
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );
    const homeLink = getByText(/home/i);
    fireEvent.click(homeLink);
    expect(testLocation.pathname).toBe('/');
  });

  it('test if About link takes to the route `/about`', () => {
    let testLocation;
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );
    const aboutLink = getByText(/about/i);
    fireEvent.click(aboutLink);
    expect(testLocation.pathname).toBe('/about');
  });

  it('test if Favorite Pókemons takes to the route `/favorites`', () => {
    let testLocation;
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );
    const favoritesLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritesLink);
    expect(testLocation.pathname).toBe('/favorites');
  });

  it('test if any other path render the NotFound component', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/other'] }>
        <App />
      </MemoryRouter>,
    );
    const notFound = getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
