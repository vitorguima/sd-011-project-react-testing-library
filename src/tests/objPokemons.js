const objPokemons = (pokemonsArr, favorite) => pokemonsArr.reduce((acc, crr) => {
  const { id } = crr;
  acc[id] = favorite;
  return acc;
}, { });

export default objPokemons;
