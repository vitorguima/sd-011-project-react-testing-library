import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const pokeMocks = {};

const length = 7;

test('Teste 1: testa renderização do h2', () => {
  // é necessário mockar o objeto que seria retornado (com pokémons encontrados) pois a renderização só acontece após o retorno.
  // const pokeMocks = {};
  const { getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokeMocks } />,
  );

  const headling = getByRole('heading',
    { name: /Encountered pokémons/i });

  expect(headling).toBeInTheDocument();
});

test('Teste 2: textos e primeiro teste de botão - sem fire event', () => {
  const { getByText, getAllByTestId } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokeMocks } />,
  );
  expect(getByText('All')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  // foi necessário mockar um length fake pro teste pensar que estou percorrendo os pokemons de verdade.
  expect(getAllByTestId('pokemon-type-button').length).toBe(length);
});

// ***refazer*/
test('Teste 3: fire event', () => {
  const { getByRole, getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokeMocks } />,
  );
  pokemons.map((pokemon) => {
    const { type } = pokemon;
    expect(getByRole('button', { name: type })).toBeInTheDocument();
    return true;
  });
  fireEvent.click(getByText('All'));
//   // resultado da ação:
//   expect (pokelista[1]).toBe(segundoPokemon);
});
