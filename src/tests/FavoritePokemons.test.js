import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test FavouritePokemon component', () => {
  it('Check if it shown on screen the following msg: No favorite Pokémon Found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const element = getByText(/No favorite pokemon found/i);
    expect(element).toBeInTheDocument();
  });

  it('Check if all favourited Pokémons cards are shown on the screen.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const homePath = getByText(/Home/);
    fireEvent.click(homePath);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const favoritePath = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePath);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
