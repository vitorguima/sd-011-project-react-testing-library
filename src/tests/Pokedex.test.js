import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';
import { getByTestId, getByText } from '@testing-library/react';

describe('Test the Pokedex Component', () => {
  const fakePokemonFatoriteByIdObj = {};
  const pokemonList = pokemons;

  it('Test if the page contains a H2 with the text "Encountered pokémon"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    const h2Pokedex = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(h2Pokedex).toBeInTheDocument();
  });

  it('Test if the next Pokemon is shown, when Próximo pokémon button is clicked', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/ });
    pokemonList.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextPokemonButton);
    });
  });

  it('Test if the first poke, appears after the last one', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    pokemonList.forEach(() => {
      fireEvent.click(getByRole('button', { name: /Próximo pokémon/ }));
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Test if only one pokemon shows at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    pokemonList.forEach(() => {
      expect(getAllByTestId('pokemon-name').length).toBe(1);
    });
  });

  it('Test if the Pokedex shows the filter buttons', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    pokemonList.forEach(({ type }) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
  });

  it('Test once clicked in a type button, it shows pokemons of that chosen type', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    fireEvent.click(getByRole('button', { name: 'Fire' }));
    expect(getByTestId('pokemon-type')).toHaveTextContent('Fire');
    expect(getByTestId('pokemon-name')).toHaveTextContent('Charmander');
    fireEvent.click(getByRole('button', { name: 'Próximo pokémon' }));
    expect(getByTestId('pokemon-type')).toHaveTextContent('Fire');
    expect(getByTestId('pokemon-name')).toHaveTextContent('Rapidash');
  });

  it('Test if Pokedex has a reset filter button', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('Pokedex shows all pokemons without any filter once All button is clicked', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ fakePokemonFatoriteByIdObj }
      />,
    );
    fireEvent.click(getByRole('button', { name: 'Fire' }));
    expect(getByTestId('pokemon-type')).toHaveTextContent('Fire');
    // onde eu acesso a lista de pokemons de fogo
    fireEvent.click(getByRole('button', { name: 'All' }));
    // onde eu acesso a lista de todos os pokemons
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });

  it('', () => {
    
  });
});
