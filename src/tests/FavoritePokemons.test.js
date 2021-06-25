import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Verifica "No favorite pokemon found" ao não haver Pokemon favoritado.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteMsg = getByText('No favorite pokemon found');
    expect(noFavoriteMsg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    /** Primeiro, renderizar a página. */
    const { getByText, history, container } = renderWithRouter(<App />);

    /** Armazana o botão de mais detalhes e clica */
    const moreDetailsLink = getByText('More details');
    fireEvent.click(moreDetailsLink);

    /** Verifica se o "pathname" é referente à página de detalhes.
     * Este teste irá passar na página de detalhes de qualquer Poke.
     * Ele veficará se o pathname é pokemons/algum numero/ no Regex. */
    expect(history.location.pathname).toMatch(/pokemons\/(\d+)/);

    /** Clica no input de favoritar pokémon. */
    const inputFavorite = getByText('Pokémon favoritado?');
    fireEvent.click(inputFavorite);
    expect(inputFavorite).toBeEnabled();

    /** Clica no link e verifica URL */
    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');

    /** Verifica se pokemons favoritados são rendezirados
     * OBS: Se o elemento na const abaixo existir, significa que
     * existem pokemons favoritados. */
    const favoriteElement = container.getElementsByClassName('pokemon');
    expect(favoriteElement[0]).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokemon é exibido', () => {
    /** Primeiro, renderizar a página. */
    const { container } = renderWithRouter(<FavoritePokemons />);

    /** Verifica se pokemons não são rendezirados
      * OBS: Se o elemento na const abaixo não existir,
      * significa que não existem pokemons favoritados. */
    const notFound = container.querySelector('.pokemon');
    expect(notFound).not.toBeInTheDocument();
  });
});
