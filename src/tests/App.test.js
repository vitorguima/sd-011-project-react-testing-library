import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../components';
import App from '../App';

describe('Testing app component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders Pokedex Component as initial page', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  it('verify if exists 3 buttons in the top of the app', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeBtn = getByText('Home');
    expect(homeBtn).toBeInTheDocument();

    const aboutBtn = getByText('About');
    expect(aboutBtn).toBeInTheDocument();

    const favPokemonsBtn = getByText('Favorite Pokémons');
    expect(favPokemonsBtn).toBeInTheDocument();
  });

  it('renders Pokedex component clicking \'Home\' button', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeBtn = getByText('Home');
    fireEvent.click(homeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('renders About component clicking \'About\' button', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutBtn = getByText('About');
    fireEvent.click(aboutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('renders FavoritePokemons component clicking \'Favorite Pokemons\' button', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favPokemonsBtn = getByText('Favorite Pokémons');
    fireEvent.click(favPokemonsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('renders NotFound component if try to enter in unknown url\'s', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/unknown/url');
    const pageNotFound = getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
