import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  it('testa se "No favorite pokemon found" aparece se não houver favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const textNoFavorite = getByText(/No favorite pokemon found/i);
    expect(textNoFavorite).toBeInTheDocument();
  });

  it('testa se são exibidos todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    history.push('/pokemons/148');
    const favoriteDragonair = getByRole('checkbox');
    expect(favoriteDragonair).toBeInTheDocument();
    fireEvent.click(favoriteDragonair);
    expect(favoriteDragonair.checked).toEqual(true);

    history.push('/pokemons/65');
    const favoriteAlakazam = getByRole('checkbox');
    expect(favoriteAlakazam).toBeInTheDocument();
    fireEvent.click(favoriteAlakazam);
    expect(favoriteAlakazam.checked).toEqual(true);

    history.push('/favorites');
    const Alakazam = getByText(/Alakazam/i);
    const Dragonair = getByText(/Dragonair/i);
    expect(Alakazam).toBeInTheDocument();
    expect(Dragonair).toBeInTheDocument();
  });

  it('testa se nenhum card é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const pikachu = queryByText(/Pikachu/i);
    expect(pikachu).not.toBeInTheDocument();
  });
});
