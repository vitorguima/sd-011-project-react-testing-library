import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { Pokedex } from '../components';

const pokemonNameTestId = 'pokemon-name';
const nextPokemonTestId = 'next-pokemon';
const pokemonTypeTestId = 'pokemon-type';

const mockedPokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      { location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' },
      { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }],
    summary: 'This intelligent Pokémon roasts hard berries with electricity.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      { location: 'Alola Route 3', map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' },
      { location: 'Kanto Route 3', map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' },
      { location: 'Kanto Route 4', map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' },
      { location: 'Kanto Rock Tunnel', map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' },
    ],
    summary: 'The flame on its tail shows the strength of its life force.',
  },
];
const mockedFavorites = { 25: false, 4: false };
const types = mockedPokemons.map(({ type }) => type);

describe('Pokedex component tests', () => {
  it('should have a heading with text "Encountered pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent(/encountered pokémons/i);
  });

  it('should have a next pokémon button and show next pokémon when clicked', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ mockedPokemons } isPokemonFavoriteById={ mockedFavorites } />
      </MemoryRouter>,
    );

    const firstPokemonName = screen.getByTestId(pokemonNameTestId).textContent;
    const nextButton = screen.getByTestId(nextPokemonTestId);
    expect(nextButton).toHaveTextContent(/próximo pokémon/i);
    fireEvent.click(nextButton);

    let nextPokemonName = screen.getByTestId(pokemonNameTestId).textContent;
    expect(nextPokemonName).not.toEqual(firstPokemonName);

    fireEvent.click(nextButton);
    nextPokemonName = screen.getByTestId(pokemonNameTestId).textContent;
    expect(nextPokemonName).toEqual(firstPokemonName);
  });

  it('should only render one pokémon at a time', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId(pokemonNameTestId)).toHaveLength(1);
    fireEvent.click(screen.getByTestId(nextPokemonTestId));
    expect(screen.getAllByTestId(pokemonNameTestId)).toHaveLength(1);
  });

  it('should have filter buttons that filter pokémons by type', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((filterButton) => {
      fireEvent.click(filterButton);
      const pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
      expect(pokemonType).toBe(filterButton.textContent);
    });
  });

  it('should have a type filter reset button', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ mockedPokemons } isPokemonFavoriteById={ mockedFavorites } />
      </MemoryRouter>,
    );

    let pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe(types[0]);
    fireEvent.click(screen.getByTestId(nextPokemonTestId));
    pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe(types[1]);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe(types[0]);
    fireEvent.click(screen.getByTestId(nextPokemonTestId));
    pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe(types[1]);
  });

  it('should dinamically create type filter buttons and have a reset button', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ mockedPokemons } isPokemonFavoriteById={ mockedFavorites } />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(types.length);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    types.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
    });
  });

  it('should disable next pokémon button when there is only one', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ mockedPokemons } isPokemonFavoriteById={ mockedFavorites } />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(nextPokemonTestId).disabled).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: types[0] }));

    expect(screen.getByTestId(nextPokemonTestId).disabled).toBe(true);
  });
});
