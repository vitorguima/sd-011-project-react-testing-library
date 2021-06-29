import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o componente Favorite Pokemons', () => {
  it('Verifica se aparece "No favorite pokemon found" senão tem pokémon favorito', () => {
    const { getByText } = render(<FavoritePokemons />);
    const msg = getByText(/No favorite pokemon found/i);

    expect(msg).toBeInTheDocument();
  });

  it('Verifica se exibe todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoritePikachu = getByRole('checkbox');
    expect(favoritePikachu).toBeInTheDocument();
    fireEvent.click(favoritePikachu);
    expect(favoritePikachu.checked).toEqual(true);

    history.push('/pokemons/4');
    const favoriteCharmander = getByRole('checkbox');
    expect(favoriteCharmander).toBeInTheDocument();
    fireEvent.click(favoriteCharmander);
    expect(favoriteCharmander.checked).toEqual(true);

    history.push('/favorites');
    const pikachu = getByText(/pikachu/i);
    const charmander = getByText(/charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });

  it('Verifica se o card do pokémon não aparece se ele não estiver favoritado', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const pikachu = queryByText(/pikachu/i);

    expect(pikachu).not.toBeInTheDocument();
  });
});
