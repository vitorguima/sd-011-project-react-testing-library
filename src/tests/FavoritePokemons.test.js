import React from 'react';
import { fireEvent } from '@testing-library/react';
// import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Exibe No favorite pokemon found, se não houver pokémons favoritos.', () => {
    localStorage.clear();
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemon = getByText(/No favorite pokemon found/);
    expect(noPokemon).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, history, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const checkFavorite = getByRole('checkbox');
    fireEvent.click(checkFavorite);
    history.push('/favorites');
    const pikachuText = getByText(/Pikachu/);
    expect(pikachuText).toBeInTheDocument();
  });

  test('Nenhum card de pokémon é exibido, se não estiver favoritado.', () => {
    localStorage.clear();
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemon = getByText(/No favorite pokemon found/i);
    expect(noPokemon).toBeInTheDocument();
  });
});
