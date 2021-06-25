import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

const TEXTO_BOTAO_NEXT = 'next-pokemon';

describe('Testing component PokeDex', () => {
  it('If has h2 with text { Encountered pokémons }', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokeDexTitle = getByRole('heading', { level: 2 });
    expect(pokeDexTitle.textContent).toBe('Encountered pokémons');
  });

  it('If button next is pressed next pokemon has to appear', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemons = Data.map((value) => value.name);
    const btnPokemon = getByTestId(TEXTO_BOTAO_NEXT);
    expect(btnPokemon.textContent).toBe('Próximo pokémon');
    const actualPokemon = getByTestId('pokemon-name');
    pokemons.forEach((item) => {
      expect(actualPokemon.textContent).toBe(item);
      fireEvent.click(btnPokemon);
    });
  });

  it('If button filter is pressed all pokemon has to be filter', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const pokemonType = getByTestId('pokemon-type');
    const btnPokemon = getByTestId(TEXTO_BOTAO_NEXT);
    const allTypesPokemonButton = getAllByTestId('pokemon-type-button');
    const pokemons = Data.map((value) => value.type);
    pokemons.forEach((item) => {
      fireEvent.click(allTypesPokemonButton.find((type) => type.textContent === item));
      expect(pokemonType.textContent).toBe(item);
      fireEvent.click(btnPokemon);
    });
  });

  it('If button All is pressed all pokemons has to be show', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const actualPokemon = getByTestId('pokemon-name');
    const pokemons = Data.map((value) => value.name);
    const btnPokemon = getByTestId(TEXTO_BOTAO_NEXT);
    const allTypesPokemonButton = getByText('All');
    fireEvent.click(allTypesPokemonButton);
    pokemons.forEach((item) => {
      expect(actualPokemon.textContent).toBe(item);
      fireEvent.click(btnPokemon);
    });
  });
});
