import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Pokedex.js component', () => {
  const pokemons = [
    {
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      foundAt: [{
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      }],
      id: 25,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      name: 'Pikachu',
      summary: 'This intelligent Pokémon...',
      type: 'Electric',
    },
    {
      averageWeight: {
        value: '2.9',
        measurementUnit: 'kg',
      },
      foundAt: [{
        location: 'Johto Route 30',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      }],
      id: 10,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      name: 'Caterpie',
      summary: 'For protection, it releases...',
      type: 'Bug',
    },
  ];
  const isPokemonFavoriteById = {
    25: true,
    10: false,
  };

  it('should display a heading with specific text', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const heading = screen.getByText(/Encountered pokémons/i);
    expect(heading).toBeVisible();
  });

  it('should show next pokemon when next button is clicked', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextPokemonButton = screen.getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemonButton);
    const nextPokemonName = screen.getByText(/Caterpie/i);
    expect(nextPokemonName).toBeVisible();
  });

  it('should display only one pokemon at a time', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const displayedPokemons = screen.getAllByText(/Average weight/i);
    expect(displayedPokemons).toHaveLength(1);
  });

  it('should render the filter buttons', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[0]).toBeVisible();
    expect(filterButtons[filterButtons.length - 1]).toBeVisible();
  });

  it('should display only one type of pokemon when filter is applied', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const bugTypeButton = screen.getByRole('button', { name: /Bug/i });
    fireEvent.click(bugTypeButton);
    const bugPokemon = screen.getByText(/Caterpie/i);
    expect(bugPokemon).toBeVisible();

    const resetFilterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(resetFilterButton);
    const pikachuPokemon = screen.getByText(/Pikachu/i);
    expect(pikachuPokemon).toBeVisible();
  });
});
