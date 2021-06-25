import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('3- Test <FavoritePokémons.js /> component', () => {
  it('Should have a message "No favorite pokemon found"', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });

  it('Should display cards of pokemons selected', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);

    const favoriteChk = getByRole('checkbox');
    fireEvent.click(favoriteChk);

    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const pikachu = getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });

  it('Should not display any pokemon card when unselected favorite', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);

    const favoriteChk = getByRole('checkbox');
    fireEvent.click(favoriteChk);

    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);

    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
});
