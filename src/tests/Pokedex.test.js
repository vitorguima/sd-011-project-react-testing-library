import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const THREE = 3;

const testIds = {
  NEXT_POKEMON: 'next-pokemon',
  POKEMON_NAME: 'pokemon-name',
  POKEMON_TYPE_BUTTON: 'pokemon-type-button',
};

test('tem um título com o texto "Encountered pokémons"', () => {
  const { container } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />,
  );

  const title = container.querySelector('h2');
  expect(title.textContent).toBe('Encountered pokémons');
});

test('exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ [
        pokemons[0],
        pokemons[1],
      ] }
      isPokemonFavoriteById={ {} }
    />,
  );

  const botaoProximo = screen.getByTestId(testIds.NEXT_POKEMON);
  expect(botaoProximo.textContent).toBe('Próximo pokémon');

  const divNomePokemon = screen.getByTestId(testIds.POKEMON_NAME);
  expect(divNomePokemon.textContent).toBe('Pikachu');

  act(() => {
    fireEvent.click(botaoProximo);
  });

  expect(divNomePokemon.textContent).toBe('Charmander');

  act(() => {
    fireEvent.click(botaoProximo);
  });

  expect(divNomePokemon.textContent).toBe('Pikachu');
});

test('mostra apenas um Pokémon por vez', () => {
  const { container } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />,
  );

  const pokemonDivs = container.querySelectorAll('.pokemon');
  expect(pokemonDivs.length).toBe(1);
});

test('tem os botões de filtro', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />,
  );

  const botoesFiltro = screen.getAllByTestId(testIds.POKEMON_TYPE_BUTTON);
  expect(botoesFiltro[0].textContent).toBe('Electric');
  expect(botoesFiltro[1].textContent).toBe('Fire');
  expect(botoesFiltro[2].textContent).toBe('Bug');
  expect(botoesFiltro[3].textContent).toBe('Poison');
  expect(botoesFiltro[4].textContent).toBe('Psychic');
  expect(botoesFiltro[5].textContent).toBe('Normal');
  expect(botoesFiltro[6].textContent).toBe('Dragon');

  const divNomePokemon = screen.getByTestId(testIds.POKEMON_NAME);
  expect(divNomePokemon.textContent).toBe('Pikachu');

  act(() => {
    fireEvent.click(botoesFiltro[1]);
  });

  expect(divNomePokemon.textContent).toBe('Charmander');

  act(() => {
    fireEvent.click(screen.getByTestId(testIds.NEXT_POKEMON));
  });

  expect(divNomePokemon.textContent).toBe('Rapidash');
});

test('contém um botão para resetar o filtro', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />,
  );

  const botaoTodos = screen.getByText('All');
  const botaoFire = screen.getAllByTestId('pokemon-type-button')[1];
  const botaoProximo = screen.getByTestId(testIds.NEXT_POKEMON);
  const divNomePokemon = screen.getByTestId(testIds.POKEMON_NAME);

  expect(divNomePokemon.textContent).toBe('Pikachu');
  expect(botaoProximo.disabled).toBe(false);

  act(() => {
    fireEvent.click(botaoFire);
  });

  expect(divNomePokemon.textContent).toBe('Charmander');

  act(() => {
    fireEvent.click(botaoTodos);
  });

  expect(divNomePokemon.textContent).toBe('Pikachu');
});

test('cria dinamicamente um botão de filtro para cada tipo de Pokémon', () => {
  const { unmount } = renderWithRouter(
    <Pokedex
      pokemons={ [pokemons[0], pokemons[1]] }
      isPokemonFavoriteById={ {} }
    />,
  );

  let botoesFiltro = screen.getAllByTestId(testIds.POKEMON_TYPE_BUTTON);
  expect(botoesFiltro.length).toBe(2);
  expect(botoesFiltro[0].textContent).toBe('Electric');
  expect(botoesFiltro[1].textContent).toBe('Fire');
  screen.getByText('All');

  unmount();

  renderWithRouter(
    <Pokedex
      pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
      isPokemonFavoriteById={ {} }
    />,
  );

  botoesFiltro = screen.getAllByTestId(testIds.POKEMON_TYPE_BUTTON);
  expect(botoesFiltro.length).toBe(THREE);
  expect(botoesFiltro[0].textContent).toBe('Electric');
  expect(botoesFiltro[1].textContent).toBe('Fire');
  expect(botoesFiltro[2].textContent).toBe('Bug');
  screen.getByText('All');
});

test('desabilita o botão Próximo Pokémon quando houver só um Pokémon', () => {
  const { unmount } = renderWithRouter(
    <Pokedex
      pokemons={ [pokemons[0]] }
      isPokemonFavoriteById={ {} }
    />,
  );

  let botaoProximo = screen.getByTestId(testIds.NEXT_POKEMON);
  expect(botaoProximo.disabled).toBe(true);

  unmount();

  renderWithRouter(
    <Pokedex
      pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
      isPokemonFavoriteById={ {} }
    />,
  );

  botaoProximo = screen.getByTestId(testIds.NEXT_POKEMON);
  expect(botaoProximo.disabled).toBe(false);
});
