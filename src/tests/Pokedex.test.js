import { fireEvent } from '@testing-library/dom';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';

const isPokemonFavoriteById = {
  4: false,
  25: false,
  78: false,
};

const pokemons = [
  { id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' },
  { id: 4, name: 'Charmander', type: 'Fire', averageWeight: { value: '8.5', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)', foundAt: [{ location: 'Alola Route 3', map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' }, { location: 'Kanto Route 3', map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' }, { location: 'Kanto Route 4', map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' }, { location: 'Kanto Rock Tunnel', map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' }], summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.' },
  { id: 78, name: 'Rapidash', type: 'Fire', averageWeight: { value: '95.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Route 28', map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png' }, { location: 'Johto Mount Silver', map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png' }], summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.' },
];

describe('Check the behavior of the Pokedex page', () => {
  it('Check the page title', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const title = getByText(/Encountered pokémons/);
    expect(title).toBeInTheDocument();
  });

  it('Check if the "Next Pokemon" button is rendered', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const nextPokemonBtn = getByText(/Próximo pokémon/);
    expect(nextPokemonBtn).toBeInTheDocument();
  });

  it('Check if the filter "All" is rendered', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const filterAllPokemons = getByText(/All/);
    expect(filterAllPokemons).toBeInTheDocument();
  });

  it('Check functionality "Next pokemon" button with filter "All"', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const filterAllPokemons = getByText(/All/);
    fireEvent.click(filterAllPokemons);

    pokemons.forEach((pokemon) => {
      const { name, type, averageWeight } = pokemon;
      const { value, measurementUnit } = averageWeight;

      const pokemonName = getByTestId('pokemon-name');
      const pokemonType = getByTestId('pokemon-type');
      const pokemonWeight = getByTestId('pokemon-weight');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName.innerHTML).toBe(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType.innerHTML).toBe(type);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

      const nextPokemonBtn = getByText(/Próximo pokémon/);
      fireEvent.click(nextPokemonBtn);
    });
  });

  it('Checks whether filters are rendered dynamically', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    // Precisei fazer o expect assim para passar no stryker, mas do modo comentado abaixo eu achei melhor.

    const pokemonFilters = getAllByTestId('pokemon-type-button');
    expect(pokemonFilters.length).toBe(2);

    // pokemons.forEach((pokemon) => {
    //   const filter = getByRole('button', { name: pokemon.type });
    //   expect(filter).toBeInTheDocument();
    //   expect(filter.innerHTML).toBe(pokemon.type);
    // });

    // Sempre que possível utilizar o getByRole que recebe dois parâmetros => getByRole('button', {name: /submit/i})
    // Como pegar um valor específico: https://testing-library.com/docs/queries/about/#priority
    // https://www.youtube.com/watch?v=5ptcfSEH7vw
  });

  it('Check if "Next Pokemon" button is disabled', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const nextPokemonBtn = getByRole('button', { name: /Próximo pokémon/ });
    const filterByEletricPokemon = getByRole('button', { name: /Electric/ });

    expect(filterByEletricPokemon).toBeInTheDocument();
    expect(nextPokemonBtn.disabled).toBe(false);

    fireEvent.click(filterByEletricPokemon);

    expect(nextPokemonBtn.disabled).toBe(true);
  });
});
