import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
// import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
// import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa exibição "No favorite pokemon found" se não tiver pokémon favorito.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    if (!localStorage.getItem('favoritePokemonIds')) {
      expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
    }
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByLabelText, queryByText } = renderWithRouter(<App />);

    const moreDetailsButton = getByText('More details');
    fireEvent.click(moreDetailsButton);

    const favoriteCheckBox = getByLabelText(/Pokémon favoritado/);
    fireEvent.click(favoriteCheckBox);
    console.log(favoriteCheckBox.value);
    expect(favoriteCheckBox).toBeChecked(true);

    const favoriteNavButton = getByText('Favorite Pokémons');
    fireEvent.click(favoriteNavButton);
    expect(queryByText(/No favorite pokemon found/)).toBe(null);
  });

  it('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  });
});
