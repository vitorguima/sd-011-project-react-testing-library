import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Teste componente <FavoritePokemons.js />', () => {
  test('Se é exibido a msg No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favPokemons = getByText('No favorite pokemon found');
    expect(favPokemons).toBeInTheDocument();
  });

  test('Se são exibidos todos os cards favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favPokemons = getByText('Favorite Pokémons');
    fireEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
