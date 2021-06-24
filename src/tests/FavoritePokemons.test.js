import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente FavoritePokemons', () => {
  it('Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemonsButton = getByText('Favorite Pokémons');

    fireEvent.click(favoritePokemonsButton);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Verifica se é exibido na tela os pokemons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));
    fireEvent.click(getByText('Bug'));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));

    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Caterpie')).toBeInTheDocument();
  });
});
