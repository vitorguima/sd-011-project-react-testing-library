import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Favorites Tests', () => {
  test('Tests if shows No favorite Pokemon Found with no Pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);

    expect(getByText(/No favorite Pokemon Found/i)).toBeInTheDocument();
  });

  it('Tests if all favorite Pokemon cards are displayed', () => {
    const { getByText, history, getByRole } = renderWithRouter(<App />);

    const details = getByText('More details');
    fireEvent.click(details);
    const favorite = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    fireEvent.click(favorite);
    history.push('/favorites');
    const favStar = getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(favStar).toBeInTheDocument(); // estrelinha do pokémon
  });

  it('Tests if theres no cards dispayed with no favorites', () => {
    const { getByText } = render(<FavoritePokemons />);

    const noCards = getByText(/no favorite pokemon found/i);

    expect(noCards).toBeInTheDocument();
  });
});
