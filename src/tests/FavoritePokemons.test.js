import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('teste componente FavoritePokemons', () => {
  test('renderiza No favorite pokemon found se não tiver favoritos', () => {
    const { container } = render(<FavoritePokemons />);
    const p = container.querySelector('p');
    expect(p.textContent).toBe('No favorite pokemon found');
  });

  test('teste se é exibido cards de pokemons favoritados', () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favoriteCheck = getByText(/Pokémon favoritado/i);
    fireEvent.click(favoriteCheck);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    const favoriteIcon = getByTestId('favorite-star');
    expect(favoriteIcon).toBeInTheDocument();
  });
});
