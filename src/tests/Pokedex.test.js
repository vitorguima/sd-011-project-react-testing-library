import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { Pokedex } from '../components';

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

  it('should show next pokémon when "next" button is clicked', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ mockedPokemons } isPokemonFavoriteById={ mockedFavorites } />
      </MemoryRouter>,
    );

    const encounteredHeading = screen.getByRole('heading', { level: 2 });
    const pikachu = encounteredHeading.nextElementSibling.lastChild.src;
    const nextButton = screen.getByTestId(nextPokemonTestId);
    expect(nextButton).toHaveTextContent(/próximo pokémon/i);
    fireEvent.click(nextButton);
    let newPokemon = encounteredHeading.nextElementSibling.lastChild.src;
    expect(newPokemon).not.toEqual(pikachu);

    fireEvent.click(nextButton);
    newPokemon = encounteredHeading.nextElementSibling.lastChild.src;
    expect(newPokemon).toEqual(pikachu);
  });

  it('should only render one pokémon at a time', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('link', { name: 'More details' })).toHaveLength(1);
    fireEvent.click(screen.getByTestId(nextPokemonTestId));
    expect(screen.getAllByRole('link', { name: 'More details' })).toHaveLength(1);
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
        <App />
      </MemoryRouter>,
    );

    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();

    let pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe('Electric');
    fireEvent.click(screen.getByTestId(nextPokemonTestId));
    pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe('Fire');

    fireEvent.click(resetButton);

    pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe('Electric');
    fireEvent.click(screen.getByTestId(nextPokemonTestId));
    pokemonType = screen.getByTestId(pokemonTypeTestId).textContent;
    expect(pokemonType).toBe('Fire');
  });

  it('should dinamically create type filter buttons and have a reset button', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ mockedPokemons } isPokemonFavoriteById={ mockedFavorites } />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
  });

  it('should disable next pokémon button when there is only one', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(nextPokemonTestId).disabled).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: 'Bug' }));

    expect(screen.getByTestId(nextPokemonTestId).disabled).toBe(true);
  });
});
