import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste dos componentes do <FavoritePokemons.js/>', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = render(<Favorite />);
    const text = getByText(/No favorite pokemon found/);
    expect(text).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history, getAllByText, getByRole } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoritado = getByRole('checkbox');
    fireEvent.click(favoritado);
    history.push('/pokemons/4');
    fireEvent.click(favoritado);
    history.push('/favorites');
    const pokemon = getAllByText(/kg/i);
    expect(pokemon.length).toEqual(2);
  });
});
