import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Initial test', () => {
  test('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Test Component App', () => {
  it('Test if the page of Pokedex is render when aplication is loaded', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeTitle = getByText(/Pokédex/i);
    expect(homeTitle).toBeInTheDocument();
  });

  it('Test if link Home is in the component', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });

  it('Test if link About is in the component', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  it('Test if link Favorite Pokémons is in the component', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument(favoritePokemons);
  });
});

describe('Test the links in the Component', () => {
  it('Testing navegantion to link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    fireEvent.click(homeLink);

    const URL_HOME = history.location.pathname;
    expect(URL_HOME).toBe('/');
  });

  it('Testing navegantion to link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);

    const URL_ABOUT = history.location.pathname;
    expect(URL_ABOUT).toBe('/about');
  });

  it('Testing navegantion to link Favorite', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);

    const URL_FAVORITE = history.location.pathname;
    expect(URL_FAVORITE).toBe('/favorites');
  });

  it('Testing navegantion to link NOT-FOUND', () => {
    const { history, container } = renderWithRouter(<App />);
    const nonRoute = '/nonRoute';
    history.push(nonRoute);

    expect(container.innerHTML).toMatch(/Page requested not found/i);
  });
});
