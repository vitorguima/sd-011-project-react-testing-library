import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testes relativos ao componente FavoritePokemons', () => {
  it(
    'Verifica se aparece uma mensagem caso a pessoa não tenha favoritado nenhum pokemon',
    () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={ ['/favorites'] }>
          <FavoritePokemons />
        </MemoryRouter>,
      );
      const msg = 'No favorite pokemon found';
      expect(getByText(msg)).toBeInTheDocument();
    },
  );

  it(
    'Verifica se aparece um card para cada pokemon favoritado',
    () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={ ['/favorites'] }>
          <FavoritePokemons pokemons={ pokemons } />
        </MemoryRouter>,
      );
      pokemons.forEach((pokemon) => {
        const name = getByText(pokemon.name);
        return expect(name).toBeInTheDocument();
      });
    },
  );
});
