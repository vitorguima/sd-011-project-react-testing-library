import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test the FavoritePokemons Component', () => {
  it('Test if the message "No favorite pokemon found" is shown in the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });

  it('Test if all favorited pokemons cards are shown', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /More details/ });
    fireEvent.click(detailsLink);
    const detailsURL = history.location.pathname;
    expect(detailsURL).toBe('/pokemons/25');

    const favoriteInput = getByRole('checkbox');
    expect(favoriteInput).not.toBeChecked();
    fireEvent.click(favoriteInput);
    expect(favoriteInput).toBeChecked();

    const favoriteLink = getByRole('link', { name: /Favorite Pokémons/ });
    fireEvent.click(favoriteLink);
    const favoritesURL = history.location.pathname;
    expect(favoritesURL).toBe('/favorites');
    const starImage = getByAltText(/is marked as favorite/i);
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Test if the message "No favorite pokemon found" is shown in the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
});
