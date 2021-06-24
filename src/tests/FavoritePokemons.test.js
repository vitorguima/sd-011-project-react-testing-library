import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Favorite Pokemons', () => {
  test('Apresenta No favorite pokemon found se nao houver favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundPokemon = getByText('No favorite pokemon found');
    expect(notFoundPokemon).toBeInTheDocument();
  });
  test('é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toMatch(/pokemons/);

    const checkFavorite = getByRole('checkbox');
    userEvent.click(checkFavorite);

    userEvent.click(getByText('Favorite Pokémons'));
    const teste = document.querySelectorAll('.favorite-pokemons');
    expect(teste.length).toBe(1);
  });
});
