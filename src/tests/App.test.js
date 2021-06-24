import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('App.js component', () => {
  it('should render a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render a set of navigation links in the top of the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText(/Home/i);
    const aboutLink = getByText(/About/i);
    const favoritePokemonsLink = getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});
