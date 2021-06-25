import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Testing the Favorite component', () => {
  it('Testing if the /favorites component is redirecting as it should', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const favorites = getByText(/Favorite Pokémons/i);
    userEvent.click(favorites);
    const favoritesFragment = /No favorite pokemon found/i;
    expect(getByText(favoritesFragment)).toBeInTheDocument();
  });

  it('Testing if the bookmarked pokemons are visible', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More Details/i);
    userEvent.click(moreDetails);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    userEvent.click(getByText(/Pokémon favoritado?/));
    const bookmarked = getByText(/Favorite Pokémons/i);
    userEvent.click(bookmarked);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(getByText(/Electric/i)).toBeInTheDocument();
    const altPikachu = getByAltText(/Pikachu sprite/i);
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(altPikachu.src).toBe(URL);
  });

  it('Testing if there is no cards if there is no bookmarked pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const bookmarked = getByText(/Favorite Pokémons/i);
    userEvent.click(bookmarked);
    const moreDetails = getByText(/More Details/i);
    expect(moreDetails.closest('a')).toHaveAttribute('href', '/pokemons/25');
  });
});
