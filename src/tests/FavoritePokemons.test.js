import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons, requisito 3', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const expectText = getByText(/No favorite pokemon found/i);

    expect(expectText).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);

    const favorite = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favorite);

    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);

    expect(getByText(/average weight/i)).toBeInTheDocument();
  });
});
