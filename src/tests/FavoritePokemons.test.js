import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe(' Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se não tiver pokémons favoritos, exibe a mensagem No favorite pokemon found',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const notFindPokemonFavorite = getByText('No favorite pokemon found');
      expect(notFindPokemonFavorite).toBeInTheDocument();
    });

  it('Teste se é exibido todos os cards de pokémons favoritados.',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkMoreDetails = getByText(/More details/);
      fireEvent.click(linkMoreDetails);
      const url1 = history.location.pathname;
      expect(url1).toBe('/pokemons/25');

      const favoritePokemon = getByText(/Pokémon favoritado?/);
      fireEvent.click(favoritePokemon);

      const linkFavoritePokemon = getByText(/Favorite Pokémons/);
      fireEvent.click(linkFavoritePokemon);
      const url2 = history.location.pathname;
      expect(url2).toBe('/favorites');

      const namePokemon = getByText('Pikachu');
      expect(namePokemon).toBeInTheDocument();
    });
  it('Teste se não tiver pokémons favoritos, exibe a mensagem No favorite pokemon found',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons pokemon={ [] } />);
      const notFindPokemonFavorite = getByText('No favorite pokemon found');
      expect(notFindPokemonFavorite).toBeInTheDocument();
    });
});
