import React from 'react';
import { render } from '@testing-library/react';
// import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
// import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('se é exibido "No favorite pokemon found" se não tiver pokémons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
