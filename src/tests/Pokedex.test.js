import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const dataTestId = 'next-pokemon';

test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  const { getByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Teste se é exibido o Pokémon quando o botão Próximo pokémon é clicado.', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btnPoke = getByTestId(dataTestId);
    expect(btnPoke).toBeInTheDocument();
    expect(btnPoke).toBeInTheDocument('Próximo pokémon');
  });

  test('Os próximos Pokémons da lista devem ser mostrados ao clicar no botão', () => {
    const { getByTestId, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const buttonChange = getByTestId(dataTestId);
    const arrayPokemons = pokemons.map((item) => item.name);
    arrayPokemons.forEach((item) => {
      const pokemonName = queryByText(item);
      userEvent.click(buttonChange);
      const nextClick = queryByText(item);
      expect(pokemonName).toBeInTheDocument();
      expect(nextClick).not.toBeInTheDocument();
    });
  });

  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no último botão', () => {
    const { getByTestId, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const buttonChange = getByTestId(dataTestId);
    const pokTest = pokemons[0];
    pokemons.forEach(() => {
      userEvent.click(buttonChange);
    });
    const nextPokemon = queryByText(/Pikachu/i);
    expect(nextPokemon.innerHTML).toBe(pokTest.name);
  });
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const pokemonName = getByTestId('pokemon-name');

  expect(pokemonName.innerHTML).toBe('Pikachu');
  expect(pokemonName.innerHTML).not.toBe('Alakazam');
});

test('Selecione um botão, a Pokédex deve circular pelos pokémons daquele tipo.', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const pokemonType = pokemons.map(({ type }) => type);
  const pokemonFilter = getAllByTestId('pokemon-type-button');
  const filterTxt = pokemonFilter.map((item) => item.innerHTML);
  expect(pokemonType.every((type) => filterTxt.includes(type))).toBeTruthy();
});

test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
  const { getByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const pokeName = pokemons.map(({ name }) => name);
  const pokeReset = getByText(/All/i);
  const btnReset = getByText(/Próximo pokémon/i);
  userEvent.click(pokeReset);
  pokeName.forEach((item) => {
    expect(getByText(item)).toBeInTheDocument();
    userEvent.click(btnReset);
  });
  expect(pokeReset).toBeInTheDocument();
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});
