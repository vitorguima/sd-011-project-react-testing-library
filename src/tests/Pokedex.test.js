import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

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

describe('Test if Pokedex page is being exhibited correctly', () => {
  test('checks for text on Not Found Page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const h2Text = getByText('Encountered pokémons');
    expect(h2Text).toBeInTheDocument();
  });

  test('checks for text on Not Found Page', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextButton = getByText('Próximo pokémon');
    const pokemonName = 'pokemon-name';
    const pkOne = getByTestId(pokemonName).textContent;
    fireEvent.click(nextButton);
    const pkTwo = getByTestId(pokemonName).textContent;
    expect(pkOne).not.toBe(pkTwo);
  });

  test('checks if only one pokemon is being shown', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const dataTestIds = getAllByTestId('pokemon-name');
    expect(dataTestIds).toHaveLength(1);
  });

  test('checks if filter is working properly', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const psichicFilter = getByText('Psychic');
    fireEvent.click(psichicFilter);
    const pokemonType = getByTestId('pokemon-type').textContent;
    expect(pokemonType).toEqual('Psychic');
  });

  test('checks if \'All\' button resets filter', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const allFilterBtn = getByText('All');
    fireEvent.click(allFilterBtn);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('checks if only one pokemon is being shown', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const dataTestIds = getAllByTestId('pokemon-type-button');
    const expectedArraySize = 7;
    expect(dataTestIds).toHaveLength(expectedArraySize);
  });

  test('checks if the Next Pokemon button is disable', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const dragonBtn = getByText('Dragon');
    fireEvent.click(dragonBtn);
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn).toHaveAttribute('disabled');
  });
});
