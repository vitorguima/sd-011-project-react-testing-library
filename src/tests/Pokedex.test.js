import React from 'react';
import { fireEvent } from '@testing-library/dom';

import renderWithHistory from './helpers/renderWithHistory';
import getEmptyFavoritesObject from './helpers/getEmptyFavoritesObject';
// import sleep from './helpers/sleep';

import pokemons from '../data';
import Pokedex from '../components/Pokedex';

const testIds = {
  NAME_FIELD: 'pokemon-name',
  NEXT_BUTTON: 'next-pokemon',
  TYPE_BUTTON: 'pokemon-type-button',
};

test('Pokedex heading exists and reads "Encountered pokémons"', () => {
  const { getByRole } = renderWithHistory(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ getEmptyFavoritesObject() }
    />,
  );

  const heading = getByRole('heading');
  expect(heading.tagName).toBe('H2');
  expect(heading).toHaveTextContent('Encountered pokémons');
});

// describe('Pokemon cards', () => {
//   it('are shown one by one', () => {

//   });
// });

function cycleThroughList(pokemonArray, nextButton, getByTestId, escapeCondition) {
  const TEST_ID = testIds.NAME_FIELD;

  expect(getByTestId(TEST_ID)).toHaveTextContent(pokemonArray[0].name);

  for (let i = 1; i < pokemonArray.length; i += 1) {
    fireEvent.click(nextButton);

    expect(getByTestId(TEST_ID)).toHaveTextContent(pokemonArray[i].name);
    if (escapeCondition) {
      expect(escapeCondition(pokemonArray[i])).toBe(false);
    }
  }

  fireEvent.click(nextButton);
  expect(getByTestId(TEST_ID)).toHaveTextContent(pokemonArray[0].name);
}

function countPokemon(nextButton, getByTestId) {
  const TEST_ID = testIds.NAME_FIELD;

  let currentPokemon = null;
  const firstPokemon = getByTestId(TEST_ID).innerHTML;
  let count = 0;

  while (currentPokemon !== firstPokemon) {
    count += 1;
    fireEvent.click(nextButton);

    currentPokemon = getByTestId(TEST_ID).innerHTML;
  }

  return count;
}

function getTypeList(pokemonArray) {
  return [...new Set(pokemonArray.reduce((acc, { type }) => [...acc, type], []))];
}

function filterPokemonTypeLists(pokemonArray, listFilter) {
  const typeList = getTypeList(pokemonArray);
  const filteredTypeLists = [];

  for (let i = 0; i < typeList.length; i += 1) {
    const currentSublist = pokemonArray.filter((pokemon) => pokemon.type === typeList[i]);

    currentSublist.index = i;

    if (listFilter(currentSublist)) {
      filteredTypeLists.push(currentSublist);
    }
  }

  return filteredTypeLists;
}

describe('The next button', () => {
  let getByTestId;

  beforeEach(() => {
    ({ getByTestId } = renderWithHistory(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ getEmptyFavoritesObject() }
      />,
    ));
  });

  it('exists and has the text "Próximo pokémon"', () => {
    expect(getByTestId(testIds.NEXT_BUTTON)).toHaveTextContent('Próximo pokémon');
  });

  it('cycles correctly through the list', () => {
    const nextButton = getByTestId(testIds.NEXT_BUTTON);

    cycleThroughList(pokemons, nextButton, getByTestId);
  });
});

describe('The filter buttons', () => {
  let getByTestId;
  let getAllByTestId;
  let getAllByRole;

  beforeEach(() => {
    ({ getByTestId, getAllByTestId, getAllByRole } = renderWithHistory(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ getEmptyFavoritesObject() }
      />,
    ));
  });

  it('has the All filter selected at first', () => {
    const nextButton = getByTestId(testIds.NEXT_BUTTON);
    const count = countPokemon(nextButton, getByTestId);

    expect(count).toBe(pokemons.length);
  });

  it('exist one for each type', () => {
    const typeList = getTypeList(pokemons);
    const typeButtons = getAllByTestId(testIds.TYPE_BUTTON);

    for (let i = 0; i < typeButtons.length; i += 1) {
      expect(typeButtons[i].innerHTML).toBe(typeList[i]);
    }
  });

  it('allow you to use the button to cycle correctly through the filtered list', () => {
    const filter = (list) => list.length > 1;

    const subList = filterPokemonTypeLists(pokemons, filter)[0];

    const typeButtons = getAllByTestId(testIds.TYPE_BUTTON);

    fireEvent.click(typeButtons[subList.index]);

    const { type } = subList[0];

    const nextButton = getByTestId(testIds.NEXT_BUTTON);
    const failCondition = (pokemon) => pokemon.type !== type;

    cycleThroughList(subList, nextButton, getByTestId, failCondition);
  });

  it('allow you to reset the filter by clicking on the "All" button', () => {
    const typeButtons = getAllByTestId(testIds.TYPE_BUTTON);
    const nextButton = getByTestId(testIds.NEXT_BUTTON);

    fireEvent.click(typeButtons[0]);

    let count = countPokemon(nextButton, getByTestId);

    expect(count).not.toBe(pokemons.length);

    const allButton = getAllByRole('button').find(({ innerHTML }) => innerHTML === 'All');

    fireEvent.click(allButton);

    count = countPokemon(nextButton, getByTestId);

    expect(count).toBe(pokemons.length);
  });

  it('disable the Next button when a category with a single pokemon is selected', () => {
    const filter = (list) => list.length === 1;

    const typeList = filterPokemonTypeLists(pokemons, filter)[0];

    const typeButtons = getAllByTestId(testIds.TYPE_BUTTON);
    const nextButton = getByTestId(testIds.NEXT_BUTTON);

    fireEvent.click(typeButtons[typeList.index]);

    expect(nextButton.disabled).toBe(true);
  });
});
