import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import { fireEvent } from '@testing-library/dom';

describe('Test the FavoritePokemons Component', () => {
  it('Test if the message "No favorite pokemon found" is shown in the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });

  // it('Test if all favorited pokemons cards are shown', () => {
  //   const { getByRole, history } = renderWithRouter(<App />);

  //   const detailsLink = getByRole('link', { name: /More details/ });
  //   fireEvent.click(detailsLink);
  //   const { pathname } = history.location;
  //   console.log(history.location);
  //   expect(pathname).toBe('/pokemons/25');

  //   const favoriteInput = getByRole('checkbox');
  //   expect(favoriteInput).not.toBeChecked();
  //   fireEvent.click(favoriteInput);
  //   expect(favoriteInput).toBeChecked();

  //   const favoriteLink = getByRole('link', { name: /Favorite Pokémons/ });
  //   fireEvent.click(favoriteLink);
  //   history.replace('/favorites', location);
  //   expect(pathname).toBe('/favorites');
  // });

  it('Test if the message "No favorite pokemon found" is shown in the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
});
