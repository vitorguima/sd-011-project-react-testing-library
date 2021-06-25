import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('test the Component <Pokedex />', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  it('has a heading h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const pokedexTitle = getByRole('heading', { level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
    expect(pokedexTitle).toHaveTextContent('Encountered pokémons');
  });
  it('the next pokemon is showed when "Próximo pokémon" button is clicked', () => {
    const { getByTestId, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveTextContent(/Próximo pokémon/i);
    expect(queryByText(pokemons[0].name)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(pokemons[1].name)).toBeInTheDocument();
    [...Array(pokemons.length - 2)].forEach(() => fireEvent.click(nextButton));
    expect(queryByText(pokemons[8].name)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('only one pokemon is showed at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allPokemons = getAllByTestId('pokemon-name');
    expect(allPokemons).toHaveLength(1);
  });
});
