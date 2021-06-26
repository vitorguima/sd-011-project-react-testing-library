import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const pokemonFavorite = {
  4: false,
  10: false,
  23: true,
  25: false,
  65: true,
  78: false,
  143: false,
  148: false,
  151: false,
};

const nextText = 'next-pokemon';
const pokemonName = 'pokemon-name';
const pokemonType = 'pokemon-type';

describe('Test pokedex component', () => {
  it('Verify heading', () => {
    // Teste se página contém um heading h2 com o texto Encountered pokémons.
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const heading = getByText('Encountered pokémons');
    // fazer seu teste
    expect(heading).toBeInTheDocument();
  });

  it('Check if next pokemon are working', () => {
    // Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const actualPokemon = getByTestId(pokemonName);
    const firstPokemon = 'Pikachu';
    const secondPokemon = 'Charmander';
    // interagir com eles ( se houver necessidade )
    const clickNext = getByTestId(nextText);
    fireEvent.click(clickNext);
    // fazer seu teste
    expect(actualPokemon).toHaveTextContent(secondPokemon);
    expect(actualPokemon).not.toHaveTextContent(firstPokemon);
  });

  it('Check if button Next pokemon have the text "Próximo pokémon"', () => {
    // acessar os elementos da tela
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const clickNext = getByTestId(nextText);
    const buttonText = 'Próximo pokémon';
    // fazer seu teste
    expect(clickNext).toHaveTextContent(buttonText);
  });

  it('Check if the first pokemon is show after the last', () => {
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextPokemon = getByTestId(nextText);
    // interagir com eles ( se houver necessidade )
    let count = 0;
    // eslint-disable-next-line no-magic-numbers
    while (count !== 8) {
      fireEvent.click(nextPokemon);
      count += 1;
    }
    // fazer seu teste
    const actualPokemon = getByTestId(pokemonName);
    expect(actualPokemon).toHaveTextContent('Dragonair');
    fireEvent.click(nextPokemon);
    expect(actualPokemon).toHaveTextContent('Pikachu');
  });

  it('Check if show only one pokemon', () => {
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const pokemonActual = getByTestId(pokemonName);
    expect(pokemonActual).not.toEqual();
  });

  it('Check if have filter buttons, if filters work and text in buttons', () => {
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const type = pokemonType;
    const buttons = getAllByTestId('pokemon-type-button');
    // eslint-disable-next-line no-magic-numbers
    expect(buttons.length).toBe(7);
    const fireButton = getByText('Fire');
    fireEvent.click(fireButton);
    const checkType = getByTestId(type);
    expect(checkType).toHaveTextContent('Fire');
    const nextPokemon = getByTestId(nextText);
    fireEvent.click(nextPokemon);
    expect(checkType).toHaveTextContent('Fire');
    fireEvent.click(nextPokemon);
    expect(checkType).toHaveTextContent('Fire');
    const psychicButton = getByText('Psychic');
    fireEvent.click(psychicButton);
    expect(checkType).toHaveTextContent('Psychic');
    fireEvent.click(nextPokemon);
    expect(checkType).toHaveTextContent('Psychic');
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
  });

  it('Check if button all exist', () => {
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const actualType = getByTestId(pokemonType);
    const allButton = getByText('All');
    const nextPokemon = getByTestId(nextText);
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');
    expect(actualType).toHaveTextContent('Electric');
    fireEvent.click(nextPokemon);
    expect(actualType).toHaveTextContent('Fire');
    fireEvent.click(nextPokemon);
    expect(actualType).toHaveTextContent('Bug');
    fireEvent.click(allButton);
    fireEvent.click(nextPokemon);
    expect(actualType).toHaveTextContent('Fire');
  });
});

describe('Continue testing', () => {
  it('Check if is dinamic create button for each type', () => {
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const actualType = getByTestId(pokemonType);
    const allButton = getByText('All');
    const getButtons = getAllByTestId('pokemon-type-button');
    // eslint-disable-next-line no-magic-numbers
    expect(getButtons.length).toBe(7);
    fireEvent.click(getButtons[0]);
    expect(actualType).toHaveTextContent('Electric');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(getButtons[1]);
    expect(actualType).toHaveTextContent('Fire');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(getButtons[2]);
    expect(actualType).toHaveTextContent('Bug');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(getButtons[3]);
    expect(actualType).toHaveTextContent('Poison');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(getButtons[4]);
    expect(actualType).toHaveTextContent('Psychic');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(getButtons[5]);
    expect(actualType).toHaveTextContent('Normal');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(getButtons[6]);
    expect(actualType).toHaveTextContent('Dragon');
    expect(allButton).toBeInTheDocument();
  });

  it('Check if next button is disabled when have only one pokemon', () => {
    const pokearray = pokemons;
    const isPokemonFavoriteById = pokemonFavorite;
    // acessar os elementos da tela
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokearray } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const poisonButton = getByText('Poison');
    const nextPokemon = getByTestId(nextText);
    fireEvent.click(poisonButton);
    expect(nextPokemon).toHaveAttribute('disabled');
  });
});
