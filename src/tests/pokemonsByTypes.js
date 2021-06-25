const pokemonsByTypes = (pokemonsArr) => pokemonsArr.reduce((acc, crr) => {
  const { type } = crr;
  const pokemonsOfType = acc[type] ? [...acc[type], crr] : [crr];
  acc[type] = pokemonsOfType;
  return acc;
}, { All: pokemonsArr });

export default pokemonsByTypes;
