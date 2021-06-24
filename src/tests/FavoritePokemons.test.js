import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 3', () => {
  it('sem pokemon favoritado', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: '/' });
    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const textNoFavorite = getByText('No favorite pokemon found');
    expect(textNoFavorite).toBeInTheDocument();
  });

  it('renderiza pokemon favoritado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));

    const pokemon = getByTestId('pokemon-name');

    expect(pokemon.textContent).toBe('Pikachu');
  });

  it('renderiza No favorite pokemon found se nenhum card for exibido', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const textNoFavorite = getByText('No favorite pokemon found');
    expect(textNoFavorite).toBeInTheDocument();
  });
});
