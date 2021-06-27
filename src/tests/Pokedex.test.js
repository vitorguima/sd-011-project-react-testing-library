import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const isPokemonFavoriteById = { 4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false };

const pokemons = [data[1], data[2]];

describe('Testing Requirement 05 - Component Pokedex.js', () => {
  it('Test if pokedex page render a h2 with text <Encountered pokémons>', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemons={ pokemons }
      />,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Test if pokedex page render next button', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemons={ pokemons }
      />,
    );
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveTextContent('Próximo pokémon');
  });

  it('Test if pokedex page render Filter Button All Pokemons', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemons={ pokemons }
      />,
    );

    const buttonFilterAll = getByText('All');
    expect(buttonFilterAll).toBeInTheDocument();
    fireEvent.click(buttonFilterAll);
    const nextButton = getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      const pokeName = getByTestId('pokemon-name');
      const pokeType = getByTestId('pokemon-type');
      const pokeWeigth = getByTestId('pokemon-weight');
      const { name, type, averageWeight: { value, measurementUnit } } = pokemon;

      expect(pokeName).toBeInTheDocument();
      expect(pokeName).toHaveTextContent(name);
      expect(pokeType).toBeInTheDocument();
      expect(pokeType).toHaveTextContent(type);
      expect(pokeWeigth).toBeInTheDocument();
      expect(pokeWeigth).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      fireEvent.click(nextButton);
    });
    expect(nextButton.disabled).toBe(false);
  });

  test('Test filter type pokemons', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavoriteById }
        pokemons={ pokemons }
      />,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(2);
    for (let index = 0; index < buttons.length; index += 1) {
      expect(buttons[index]).toHaveTextContent(pokemons[index].type);
    }
  });
});
