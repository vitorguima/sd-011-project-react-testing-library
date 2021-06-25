import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const POKEMONS = Data;

const FAVORITES = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: true,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Test component Pokedex', () => {
  it('Test if the page contains a h2 with text Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ POKEMONS } isPokemonFavoriteById={ FAVORITES } />,
    );

    const pokedex = getByText(/Encountered pokémons/i);
    expect(pokedex).toBeInTheDocument();
  });

  it('Test if appears the next Pokémon when the button `Próximo pokémon` is cliked',
    () => {
    // O botão deve conter o texto Próximo pokémon;
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={ POKEMONS } isPokemonFavoriteById={ FAVORITES } />,
      );
      const button = getByText(/Próximo pokémon/);
      expect(button).toBeInTheDocument();
    });

  it('Teste se os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar',
    () => {
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={ POKEMONS } isPokemonFavoriteById={ FAVORITES } />,
      );

      const allPokemons = getByText('All');
      fireEvent.click(allPokemons);
      expect(allPokemons).toBeInTheDocument();

      const button = getByText(/Próximo pokémon/);
      expect(button).toBeInTheDocument();
      POKEMONS.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        fireEvent.click(button);
      });
      expect(getByText('Pikachu')).toBeInTheDocument();
    });

  it('Test if Pokedex has a filter button functioning', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ POKEMONS } isPokemonFavoriteById={ FAVORITES } />,
    );
    const filterButton = getAllByTestId('pokemon-type-button');
    const fireButton = filterButton.find((button) => button.textContent === 'Fire');
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);
    expect(getByText('Charmander')).toBeInTheDocument();

    const nextPokemonButton = getByText(/Próximo pokémon/);
    fireEvent.click(nextPokemonButton);
    expect(nextPokemonButton).toBeInTheDocument();
    const nextPokemon = getByText('Rapidash');
    expect(nextPokemon).toBeInTheDocument();
  });
});
