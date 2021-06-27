import React from 'react';
import { fireEvent } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<Favorite />);
    const noFavorite = getByText('No favorite pokemon found');

    expect(noFavorite).toBeInTheDocument();
  });

  it('Se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const detailsPokemon = getByText('More details');
    fireEvent.click(detailsPokemon);

    const favoriteInput = getByRole('checkbox');

    fireEvent.click(favoriteInput);

    const favoritePage = getByText('Favorite Pokémons');
    fireEvent.click(favoritePage);

    const favoriteText = getByText(/kg/i);
    expect(favoriteText).toBeInTheDocument();
  });
});
