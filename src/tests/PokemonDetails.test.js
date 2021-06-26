import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const props = {
  match: {
    params: {
      id: '25',
    },
  },
};
const isPokemonFavoriteById = {
  4: true,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Test if Pokemon Details component is being exhibited correctly', () => {
  test('checks for pokemon info', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        { ...props }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const pkSum = getByText('This intelligent Pokémon roasts' 
    +' hard berries with electricity to make them tender enough to eat.')
    const pokemonName = getByText('Pikachu Details');
    const sumText = getByText('Summary');
    expect(pokemonName && sumText && pkSum).toBeInTheDocument();
  });

  test(('checks for pokemon location info'), () => {
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        { ...props }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const gameLocation = getByText('Game Locations of Pikachu');
    const locationMap = getAllByAltText('Pikachu location');
    locationMap.forEach(map => expect(map).toHaveAttribute('src'))
    expect(gameLocation).toBeInTheDocument()  
  })
});
