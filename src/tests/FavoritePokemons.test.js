import React from 'react';
import { fireEvent } from '@testing-library/dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('tests Favorite Pokemons component', () => {
  it('checks if there is a message `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoritesMessage = getByText('No favorite pokemon found');
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it('checks if all favorite cards are rendered', () => {
    const { getByText, history, getByRole, getByTestId } = renderWithRouter(<App />);
    const detailsLink = getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteCheckBox = getByRole('checkbox');
    expect(favoriteCheckBox).toBeInTheDocument();
    fireEvent.click(favoriteCheckBox);
    const favoritesLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritesLink);
    const favoriteName = getByTestId('pokemon-name');
    expect(favoriteName).toBeInTheDocument();
    const favoriteType = getByTestId('pokemon-name');
    expect(favoriteType).toBeInTheDocument();
    const favoriteWeigth = getByTestId('pokemon-weight');
    expect(favoriteWeigth).toBeInTheDocument();
  });
});
