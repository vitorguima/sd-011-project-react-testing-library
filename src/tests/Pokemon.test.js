import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const data = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard',
};

const favorite = false;
const favoriteTrue = true;

describe('Verifica se renderiza card com as infos de determinado pokémon', () => {
  it('Nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  it('Tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  it('Peso médio deve ser exibido com um texto no formato específico', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonAverageWeigth = getByTestId('pokemon-weight');
    expect(pokemonAverageWeigth.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('Aimagem do Pokémon deve ser exibida com descrição "alt"', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonImage = getAllByRole('img');
    expect(pokemonImage[0].alt).toBe('Pikachu sprite');
    expect(pokemonImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se o card do Pokémon indicado contém um link de navegação ', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonDetailsLink = getAllByRole('link');
    expect(pokemonDetailsLink[0].href).toBe('http://localhost/pokemons/25');
  });

  it('Verifica se ao clicar no link do Pokémon, é feito o redirecionamento', () => {
    const { getAllByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favorite }
      />,
    );
    const pokemonDetailsLink = getAllByRole('link');
    fireEvent.click(pokemonDetailsLink[0]);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ data }
        isFavorite={ favoriteTrue }
      />,
    );
    const pokemonFavoriteIcon = getAllByRole('img');
    expect(pokemonFavoriteIcon[1].src).toBe('http://localhost/star-icon.svg');
    expect(pokemonFavoriteIcon[1].alt).toBe('Pikachu is marked as favorite');
  });
});
