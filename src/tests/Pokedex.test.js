import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
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
  const nextButtonTestId = 'next-pokemon';
  const typeButtonsTestId = 'pokemon-type-button';
  const pokemonTypeTestId = 'pokemon-type';
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
    const nextButton = getByTestId(nextButtonTestId);
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
  it('when a type button is clicked, the pokedex will only show pokemons of that type',
    () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );
      const typeButtons = getAllByTestId(typeButtonsTestId);
      const nextButton = getByTestId(nextButtonTestId);
      const type = typeButtons[0].innerHTML;
      fireEvent.click(typeButtons[0]);
      expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(type);
      fireEvent.click(nextButton);
      expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(type);
      fireEvent.click(nextButton);
      expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(type);
    });
  it('has a button "All" to reset the type filter', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allButton = getByText('All');
    const typeButtons = getAllByTestId(typeButtonsTestId);
    const nextButton = getByTestId(nextButtonTestId);
    expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(pokemons[0].type);
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonTypeTestId)).not.toHaveTextContent(pokemons[0].type);
    fireEvent.click(typeButtons[0]);
    expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(pokemons[0].type);
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(pokemons[0].type);
    fireEvent.click(allButton);
    expect(getByTestId(pokemonTypeTestId)).toHaveTextContent(pokemons[0].type);
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonTypeTestId)).not.toHaveTextContent(pokemons[0].type);
  });
  it('the type buttons are created dinamically', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const typeButtons = getAllByTestId(typeButtonsTestId);
    const allButton = getByText('All');
    const fullSize = 7;
    expect(typeButtons).toHaveLength(fullSize);
    expect(allButton).toBeInTheDocument();
    expect(typeButtons[0]).toHaveTextContent('Electric');
    expect(typeButtons[1]).toHaveTextContent('Fire');
    expect(typeButtons[2]).toHaveTextContent('Bug');
    expect(typeButtons[3]).toHaveTextContent('Poison');
    expect(typeButtons[4]).toHaveTextContent('Psychic');
    expect(typeButtons[5]).toHaveTextContent('Normal');
    expect(typeButtons[6]).toHaveTextContent('Dragon');
    cleanup();
    const lesspokemons = [pokemons[3], pokemons[5], pokemons[6]];
    const smalersize = 3;
    renderWithRouter(
      <Pokedex
        pokemons={ lesspokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const newtypeButtons = getAllByTestId(typeButtonsTestId);
    const newallButton = getByText('All');
    expect(newtypeButtons).toHaveLength(smalersize);
    expect(newallButton).toBeInTheDocument();
    expect(newtypeButtons[0]).toHaveTextContent('Poison');
    expect(newtypeButtons[1]).toHaveTextContent('Psychic');
    expect(newtypeButtons[2]).toHaveTextContent('Fire');
  });
  it('the "Próximo pokémon" button is disable when there is only one pokemon to show',
    () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );
      const typeButtons = getAllByTestId(typeButtonsTestId);
      const nextButton = getByTestId(nextButtonTestId);
      expect(nextButton).not.toBeDisabled();
      fireEvent.click(typeButtons[0]);
      expect(nextButton).toBeDisabled();
      fireEvent.click(typeButtons[1]);
      expect(nextButton).not.toBeDisabled();
      fireEvent.click(typeButtons[2]);
      expect(nextButton).toBeDisabled();
    });
});
