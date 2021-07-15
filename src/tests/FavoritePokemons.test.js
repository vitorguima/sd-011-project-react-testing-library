import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import { fireEvent, getByRole } from '@testing-library/dom';

describe('Test all Favorite Pokemons component', () => {
  test('if renders `Favorites` component with Heading `Favorite Pokémons`', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);

    const heading = getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/Favorite pokémons/i);
  });

  test('if starts with a `No favorite pokemon found` text message', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const noFoundMessage = getByText(/No favorite pokemon found/i);
    expect(noFoundMessage).toBeInTheDocument();
  });

  test('if renders a favorited pokemon', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const detailsLink = getByText('More details');
    fireEvent.click(detailsLink);
    const favoriteInput = getByRole('checkbox');
    expect(favoriteInput.checked).toBe(false);
    fireEvent.click(favoriteInput);
    expect(favoriteInput.checked).toBe(true);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const pokemons = getAllByRole('img');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[1].alt).toBe('Pikachu is marked as favorite');
  });
});
