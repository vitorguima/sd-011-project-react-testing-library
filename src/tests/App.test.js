import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests in Home page and Links `/` ', () => {
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

  it('Verify if exists Home, About and Favorite Pokémons link', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeButton = getByText(('Home'));
    const aboutButton = getByText(('About'));
    const favoritePokemonButton = getByText(('Favorite Pokémons'));

    expect(homeButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(favoritePokemonButton).toBeInTheDocument();
  });

  it('Verify on Home click, stay in `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText(('Home'));

    fireEvent.click(homeButton);
    const pathToHome = history.location.pathname;
    expect(pathToHome).toBe('/');
  });

  it('Verify on About click, goes to in `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText(('About'));

    fireEvent.click(homeButton);
    const pathToAbout = history.location.pathname;
    expect(pathToAbout).toBe('/about');
  });

  it('Verify on About Favorite Pokémons, goes to in `/favorites`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText(('Favorite Pokémons'));
    fireEvent.click(homeButton);
    const pathToFavorites = history.location.pathname;
    expect(pathToFavorites).toBe('/favorites');
  });

  it('Verify if unknown URL, show `NotFound`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/Hello');
    const NotFound = getByText(('Page requested not found'));
    expect(NotFound).toBeInTheDocument();
  });
});
