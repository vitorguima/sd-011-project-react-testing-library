import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes do componente FavoritePokemons', () => {
  it('Verifica se é exibido a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const title = getByText('No favorite pokemon found');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    const pageFavorites = getByText('Favorite Pokémons');
    fireEvent.click(pageFavorites);

    const namePokemon = getByText('Pikachu'); // sempre sera o primeiro elemento do array = Pikachu
    expect(namePokemon).toBeInTheDocument();
    const typePokemon = getByText('Electric');
    expect(typePokemon).toBeInTheDocument();
    const weightPokemon = getByText('Average weight: 6.0 kg');
    expect(weightPokemon).toBeInTheDocument();

    const name = getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');
    const type = getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('Verifica se nenhum card é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const favoriteList = queryByText('favorite-pokemons');
    expect(favoriteList).not.toBeInTheDocument();
  });
});
