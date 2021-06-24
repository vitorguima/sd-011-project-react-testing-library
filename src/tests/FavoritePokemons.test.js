import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o FavoritePokemons.js', () => {
  test('Testa se nao houver favoritos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite pokémons/i);
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const msg = getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, history, getByRole, queryByText } = renderWithRouter(<App />);
    const moreDatails = getByText(/More details/i);
    fireEvent.click(moreDatails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoritePoke = getByRole('checkbox');
    fireEvent.click(favoritePoke);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    expect(queryByText(/No favorite pokemon found/i)).not.toBeInTheDocument();
  });
});
