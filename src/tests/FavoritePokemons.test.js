import { fireEvent } from '@testing-library/react';
import React from 'react';
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
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    fireEvent.call(localStorage.removeItem('favoritePokemonIds'));
    // const detailButton = getByText('More details');
    // fireEvent.click(detailButton);

    const favoriteCheckBox = getByText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox.value).toEqual(true);

    const favoriteNavButton = getByText('Favorite Pokémons');
    fireEvent.click(favoriteNavButton);

    expect(getByText(/No favorite pokemon found/)).not.toBeInTheDocument();
  });

  it('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  });
});
