import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const checkNoFound = getByText(/No favorite pokemon found/i);
    expect(checkNoFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<App />);
    const checkFound = getByText(/Favorite pokémons/i);
    fireEvent.click(checkFound);
    expect(checkFound).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const checkInput = getByRole('checkbox');
    fireEvent.click(checkInput);
    const ckeckFavorite = getByText(/Favorite Pokémons/);
    fireEvent.click(ckeckFavorite);
    const checkName = getByText(/Pikachu/i);
    expect(checkName).toBeInTheDocument();
  });
});
