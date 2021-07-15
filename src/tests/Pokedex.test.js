import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = () => {
  const obj = {};
  pokemons.forEach((pokemon) => {
    obj[pokemon.id] = false;
  });
  return obj;
};
test('test if the page contain one h2 with the text Ecountered Pokémons', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const contain = screen.getByRole('heading',
    { level: 2, name: /Encountered pokémons/i });
  expect(contain).toBeInTheDocument();
});

test('the button might contain the text Next Pokémon', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const contain = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(contain).toBeInTheDocument();
});

test('test if the button Next exists and if it render Pikachu at the click', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const contain = screen.getByRole('button', { name: /All/i });
  expect(contain).toBeInTheDocument();
  fireEvent.click(contain);

  const namePokemon = screen.getByText(/pikachu/i);
  expect(namePokemon).toBeInTheDocument();
});

test('test if the button All exists and if it render Pikachu at the click', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const nameBtn = screen.getByRole('button', { name: /electric/i });
  expect(nameBtn).toBeInTheDocument();

  const contain = screen.getAllByTestId('pokemon-type-button');
  expect(contain[0]).toBeInTheDocument();
});
