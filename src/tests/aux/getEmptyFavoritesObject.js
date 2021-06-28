
import pokemons from '../../data';

export default function getEmptyFavoritesObject() {
  const isPokemonFavoriteById = {};

  pokemons.forEach(({ id }) => {
    isPokemonFavoriteById[id] = false;
  });

  return isPokemonFavoriteById;
}
