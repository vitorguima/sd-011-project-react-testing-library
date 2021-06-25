import pokemons from './data';

export const favoritePokemons = [
  pokemons[0],
  pokemons[1],
  pokemons[2],
];
export const nonFavoritePokemons = pokemons
  .filter(({ name: pokemonName }) => favoritePokemons
    .every(({ name: favoritePokemonName }) => favoritePokemonName !== pokemonName));