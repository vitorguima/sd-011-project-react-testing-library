import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Componente <favoritePokemons/>', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText('No favorite pokemon found');

    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const pokemon25 = getByRole('checkbox');
    fireEvent.click(pokemon25);
    expect(pokemon25.checked).toBe(true);

    history.push('/favorites');
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
  });
});
