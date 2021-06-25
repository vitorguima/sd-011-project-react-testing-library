import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByText(/Pokémon favoritado/));
    fireEvent.click(getByText(/Home/));
    fireEvent.click(getByText(/Bug/));
    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByText(/Pokémon favoritado/));
    fireEvent.click(getByText(/Favorite Pokémons/));
    const getFavorite = getAllByTestId('pokemon-name');
    expect(getFavorite.length).toBe(2);
  });
});
