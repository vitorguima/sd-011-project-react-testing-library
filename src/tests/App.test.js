import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the component App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Test if the top of the application contains a fixed set of navigation links',
  () => {
    it('The first link must have the text Home', () => {
      const { getByText } = renderWithRouter(<App />);
      const home = getByText(/Home/);
      expect(home).toBeInTheDocument();
    });

    it('The first link must have the text About', () => {
      const { getByText } = renderWithRouter(<App />);
      const about = getByText(/About/);
      expect(about).toBeInTheDocument();
    });

    it('The first link must have the text Favorite Pokémons', () => {
      const { getByText } = renderWithRouter(<App />);
      const favoritePokemons = getByText(/Favorite Pokémons/);
      expect(favoritePokemons).toBeInTheDocument();
    });
  });
