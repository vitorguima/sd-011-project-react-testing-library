import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

const favPokemons = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('if it contains a h2 heading with the text Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);

  expect(getByRole('heading', { name: 'Encountered pokémons' })).toBeInTheDocument();
  expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('if show the next pokemon when the button is clicked', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);

  expect(getByText(/Próximo pokémon/)).toBeInTheDocument();
  expect(getByRole('img', { name: 'Pikachu sprite' })).toBeInTheDocument();
  fireEvent.click(getByText(/Fire/));
  expect(getByRole('img', { name: 'Charmander sprite' })).toBeInTheDocument();
  fireEvent.click(getByText(/Próximo pokémon/));
  expect(getByRole('img', { name: 'Rapidash sprite' })).toBeInTheDocument();
  fireEvent.click(getByText(/Próximo pokémon/));
  expect(getByRole('img', { name: 'Charmander sprite' })).toBeInTheDocument();
});

test('if shows only one pokemon at time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const dataId = getAllByTestId('pokemon-name');
  expect(dataId.length).toBe(1);
});

test('if pokedex have filter button', () => {
  const { getAllByTestId, getByRole, getByText } = renderWithRouter(<Pokedex
    pokemons={ [pokemons[0], pokemons[1], pokemons[6]] }
    isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
  />);

  const pokeLength = 2;
  const typeFire = getAllByTestId('pokemon-type-button');
  expect(typeFire.length).toBe(pokeLength);

  const buttonFire = getByRole('button', { name: 'Fire' });
  fireEvent.click(buttonFire);

  const poke = getByText(/Charmander/i);
  expect(poke).toBeInTheDocument();

  const nextPoke = getByRole('button', { name: 'Próximo pokémon' });
  fireEvent.click(nextPoke);

  const poke2 = getByText(/Rapidash/i);
  expect(poke2).toBeInTheDocument();
});

test('if there are a button reset for type of pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const fireTypeButton = getByText('Fire');
  fireEvent.click(fireTypeButton);
  const pokemon1 = getByText('Charmander');
  expect(pokemon1).toBeInTheDocument();
  const buttonAll = getByText('All');
  fireEvent.click(buttonAll);
  const pokemon2 = getByText('Pikachu');
  expect(pokemon2).toBeInTheDocument();
});

test('should create the type buttons dynamically', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favPokemons }
  />);

  const TYPES_QUANTITY = 7;

  const pokemonTypesButtons = getAllByTestId('pokemon-type-button');
  expect(pokemonTypesButtons.length).toBe(TYPES_QUANTITY);
});

test('button disbaled when theres only one pokemon', () => {
  const { getByRole } = renderWithRouter(<Pokedex
    pokemons={ [pokemons[0]] }
    isPokemonFavoriteById={ { 25: false } }
  />);

  const nextPokemon = getByRole('button', { name: 'Próximo pokémon' });
  expect(nextPokemon).toBeInTheDocument();
  expect(nextPokemon).toHaveAttribute('disabled');
});
