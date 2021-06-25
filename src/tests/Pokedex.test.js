import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const nomes = data.map(({ name }) => name);
const tipos = [...new Set(data.map(({ type }) => type))]; // Sugestão dada pelo Tales Coelho

test('verificando se contém um h2 com texto "Encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const headerTwo = getByRole('heading', { level: 2 });
  expect(headerTwo.innerHTML).toBe('Encountered pokémons');
  expect(headerTwo).toBeInTheDocument();
});

const textButtonNext = 'next-pokemon';
const textPokemonName = 'pokemon-name';

it('verificando se aparece o próximo pokémon quando clica em "Próximo pokémon"', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const buttonNext = getByTestId(textButtonNext);

  nomes.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    fireEvent.click(buttonNext);
  });

  const firstPokemon = getByTestId(textPokemonName);
  expect(firstPokemon.innerHTML).toBe('Pikachu');
});

it('verificando se somente um pokémon é mostrado por vez', () => {
  const { getByTestId, container } = renderWithRouter(<App />);

  const buttonNext = getByTestId(textButtonNext);
  const pokemon = container.querySelector('.pokemon');
  const pokemonChild = pokemon.children;

  expect(pokemonChild.length).toBe(2);
  expect(pokemonChild[0].firstChild.innerHTML).toBe('Pikachu');

  fireEvent.click(buttonNext);
  expect(pokemonChild.length).toBe(2);
  expect(pokemonChild[0].firstChild.innerHTML).toBe('Charmander');
});

it('verificand se a Pokédex tem botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const filterButton = getAllByTestId('pokemon-type-button');
  tipos.forEach((filter, index) => {
    expect(filterButton[index]).toBeInTheDocument(filter);
  });
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText, getByTestId, getAllByText, container } = renderWithRouter(<App />);
  const resetButton = getByText('All');
  expect(resetButton).toBeInTheDocument();
  expect(resetButton.innerHTML).toBe('All');

  const filterButtonElectric = getAllByText('Electric');
  fireEvent.click(filterButtonElectric[1]);

  const buttonNext = getByTestId(textButtonNext);
  expect(buttonNext).toBeDisabled();

  fireEvent.click(resetButton);
  expect(buttonNext).toBeEnabled();

  fireEvent.click(buttonNext);
  const pokemon = container.querySelector('.pokemon');
  const pokemonChild = pokemon.children;
  expect(pokemonChild[0].firstChild.innerHTML).toBe('Charmander');
});

it('verifica se é criado, dinamicamente, um botão de filtro', () => {
  const { getAllByTestId, getAllByText, getByTestId } = renderWithRouter(<App />);
  const filterButton = getAllByTestId('pokemon-type-button');
  tipos.forEach((filter, index) => {
    expect(filterButton[index]).toBeInTheDocument(filter);
  });

  const filterButtonElectric = getAllByText('Electric');
  fireEvent.click(filterButtonElectric[1]);

  const buttonNext = getByTestId(textButtonNext);
  expect(buttonNext).toBeDisabled();
  expect(buttonNext.textContent).toBe('Próximo pokémon');
});
