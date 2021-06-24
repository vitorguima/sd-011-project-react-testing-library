import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const noMatch = getByText('No favorite pokemon found');
    expect(noMatch).toBeInTheDocument();
  });

  it('se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));

    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
