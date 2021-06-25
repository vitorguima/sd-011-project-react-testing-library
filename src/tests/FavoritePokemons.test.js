import { fireEvent } from '@testing-library/dom';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
/* import App from '../App'; */
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('Verifica se é exibido a mensagem "No favorite pokemon found"', () => {
    const { getByText, history } = renderWithRouter(<FavoritePokemons />);
    history.push('/pagina/que-não-existe/');
    const notFoundFavorite = getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
  });

  it('Verifica se é exibido a mensagem "No favorite pokemon found"', () => {
    const { getByText, history } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    history.push('/pagina/que-não-existe/');
    const notFoundFavorite = getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
