import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando componente FavoritePokenons - R3', () => {
  it('Verifica o comportamento do FavoritePokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const textNoPokemons = getByText(/No favorite pokemon found/);
    expect(textNoPokemons).toBeInTheDocument();
  });
  it('Verifica o comportame após favoritar', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const input = getByRole('checkbox');
    fireEvent.click(input);
    const linkFavPoke = getByText('Favorite Pokémons');
    fireEvent.click(linkFavPoke);
    const weight = getByText(/kg/i);
    expect(weight).toBeInTheDocument();
  });
});
