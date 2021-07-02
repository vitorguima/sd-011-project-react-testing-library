import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testes para página "Favorite Pokémons"', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found",'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noPokemonFoundText = getByText(/No favorite pokemon found/i);
    expect(noPokemonFoundText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const arryPokemon = [
      {
        averageWeight: {
          measurementUnit: 'kg',
          value: '6.0',
        },
        id: 25,
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        name: 'Pikachu',
        type: 'Electric',
      },
      {
        averageWeight: {
          measurementUnit: 'kg',
          value: '16.5',
        },
        id: 148,
        image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
        name: 'Dragonair',
        type: 'Dragon',
      },
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ arryPokemon } />);

    const foundPikachu = getByText(/Pikachu/i);
    const foundDragonair = getByText(/Dragonair/i);
    expect(foundPikachu).toBeInTheDocument();
    expect(foundDragonair).toBeInTheDocument();
  });
});

