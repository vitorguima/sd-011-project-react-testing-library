import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste componente <About.js />', () => {
  it('Exibe -No favorite pokemon found-, se não houver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const titleNoFavorite = getByText(/No favorite pokemon found/);
    expect(titleNoFavorite).toBeInTheDocument();
  });

  it('Exibe todos os cards de pokémons favoritados', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const pikachuDetails = container.querySelector('[href="/pokemons/25"]');
    fireEvent.click(pikachuDetails);

    const pikachuFavorite = container.querySelector('[for="favorite"]');
    fireEvent.click(pikachuFavorite);

    const favoritePokemons = container.querySelector('[href="/favorites"]');
    fireEvent.click(favoritePokemons);

    const pikachu = getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
  });
});
