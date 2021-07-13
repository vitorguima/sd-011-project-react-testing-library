import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se a mensagem No favorite pokemon found aparece se não tiver favoritos.',
    async () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const NoFavoritePokemon = getByText(/No favorite pokemon found/i);
      expect(NoFavoritePokemon).toBeInTheDocument();
    });

  test('Teste se é exibido todos os cards de pokémons favoritados.',
    () => {
      const { getByText, getByLabelText } = renderWithRouter(<App />);
      const text = getByText(/More details/i);
      fireEvent.click(text);
      const label = getByLabelText('Pokémon favoritado?');
      fireEvent.click(label);
      const clickPageFavorite = getByText(/Favorite Pokémons/i);
      fireEvent.click(clickPageFavorite);
      const card = getByText(/Pikachu/i);
      expect(card).toBeInTheDocument();
    });
});
