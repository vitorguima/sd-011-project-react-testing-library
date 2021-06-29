import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found',
    () => {
      const { getByText } = render(<Favorite />);
      const notFound = getByText(/No favorite pokemon found/);
      expect(notFound).toBeInTheDocument();
    });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, history, getAllByTestId } = renderWithRouter(<App />);
    history.push('/pokemons/143');
    const checkSnorlax = getByRole('checkbox');
    const favPokes = getByText(/Favorite Pokémons/);
    fireEvent.click(checkSnorlax);
    fireEvent.click(favPokes);
    const nameCard = getAllByTestId('pokemon-name');
    expect(nameCard.length).toBe(1);
    history.push('/pokemons/65');
    const checkAlakazam = getByRole('checkbox');
    fireEvent.click(checkAlakazam);
    fireEvent.click(favPokes);
    const nameCards = getAllByTestId('pokemon-name');
    expect(nameCards.length).toBe(2);
  });
});
