import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Test component <FavoritePokemons.js />', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const linkFavorite = getByText(/Pokémon favoritado/i);
    userEvent.click(linkFavorite);
    history.push('/favorites');
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('Test se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const linkFavorite = getByText(/Pokémon favoritado/i);
    userEvent.click(linkFavorite);
    history.push('/favorites');
    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });
});
