import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3 - Teste o componente <Favorite Pokemon/>', () => {
  it('Se não houver favorito, exibe a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  it('Teste se todos os cards favoritados são exibidos', () => {
    const favorites = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const fav1 = getByText('Pikachu');
    expect(fav1).toBeInTheDocument();
    const fav2 = getByText('Charmander');
    expect(fav2).toBeInTheDocument();
  });
});
