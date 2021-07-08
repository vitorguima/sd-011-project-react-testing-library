import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing Favorite Pokemons Page', () => {
  it('testing if "No favorite pokemon found" appears if theres no favorite cards', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const pageInfo = getByText(/No favorite pokemon found/i);
    expect(pageInfo).toBeInTheDocument();
  });

  it('testing if favorite cards are appearing in the Page', () => {
    const { history, getAllByText, getByRole } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favorite = getByRole('checkbox');
    fireEvent.click(favorite);
    history.push('/pokemons/4');
    fireEvent.click(favorite);
    history.push('/favorites');
    const pokemonCards = getAllByText(/details/i);
    expect(pokemonCards.length).toEqual(2);
  });
});
