import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test for the links of page home', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Check if the first link contain the text Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const LinkHome = getByText(/Home/i);
    expect(LinkHome).toBeInTheDocument();
  });

  test('Check if the second link contain the text About', () => {
    const { getByText } = renderWithRouter(<App />);
    const LinkAbout = getByText(/About/i);
    expect(LinkAbout).toBeInTheDocument();
  });

  test('Check if the third link contain the text Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const LinkFavorite = getByText(/Favorite Pokémons/i);
    expect(LinkFavorite).toBeInTheDocument();
  });
});
