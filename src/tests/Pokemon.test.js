import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: true,
};

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: { value: '6.0', measurementUnit: 'kg' },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [{ location: 'Kanto Viridian Forest',
    map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' },
  { location: 'Kanto Power Plant',
    map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to...',
};

test('O tipo correto do pokémon deve ser mostrado na tela', () => {
  const { getByText, queryByText, getByAltText, getByTestId } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].type] }
    />,
  );
  const checkPokemon = getByText(/Pikachu/i);
  const counterTest = queryByText(/Hulk/i);
  const weightPokemon = getByText(/Average weight: 6.0 kg/i);
  const imagePokemon = getByAltText(/Pikachu/i);
  const pokemonType = getByTestId('pokemon-type');
  expect(checkPokemon).toBeInTheDocument();
  expect(checkPokemon.innerHTML).toBe('Pikachu');
  expect(counterTest).not.toBeInTheDocument('Hulk');
  expect(weightPokemon).toBeInTheDocument();
  expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.innerHTML).toBe(pokemon.type);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
    />,
  );
  const btnLink = getByText(/More details/);
  userEvent.click(btnLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  expect(pathname).not.toBe('/pokemons/125');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByAltText, queryByText } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
    />,
  );
  const favoritePikachu = getByAltText(/Pikachu is marked as favorite/i);
  const favoriteMew = queryByText(/Mew/i);
  expect(favoritePikachu).toHaveAttribute('src', '/star-icon.svg');
  expect(favoriteMew).toBeNull();
});
