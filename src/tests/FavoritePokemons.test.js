import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Aparece "No favorite pokemon found" se não houver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavs = getByText('No favorite pokemon found');

    expect(noFavs).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history, getAllByText, getByRole, getByText } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const favCheckBox = getByRole('checkbox');
    fireEvent.click(favCheckBox);
    history.push('/pokemons/23');
    fireEvent.click(favCheckBox);
    history.push('/favorites');
    const pokemonCards = getAllByText(/average weight/i);
    const caterpie = getByText('Caterpie');
    const ekans = getByText('Ekans');
    expect(pokemonCards.length).toEqual(2);
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  });
});
