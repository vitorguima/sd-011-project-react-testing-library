import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Requisito 5 - Teste o componente <Pokedex/>', () => {
  const next = 'next-pokemon';
  const name = 'pokemon-name';
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    },
  ];
  it('Testa se a página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { } }
      />,
    );
    const element = getByRole('heading', { name: 'Encountered pokémons' });
    expect(element).toBeInTheDocument();
  });

  it('Testa o botão Próximo Pokémon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const button = getByTestId(next);
    expect(button).toBeInTheDocument();
    expect(button.type).toBe('button');
    expect(button).toHaveTextContent('Próximo pokémon');
    fireEvent.click(button);
    let pokemonName = getByTestId(name);
    expect(pokemonName).toHaveTextContent(/Charmander/);
    fireEvent.click(button);
    pokemonName = getByTestId(name);
    expect(pokemonName).toHaveTextContent(/Pikachu/);
  });
  it('Testa se a Pokédex tem botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const buttonTypes = getAllByTestId('pokemon-type-button');
    expect(buttonTypes.length).toBe(2);
    expect(buttonTypes[0]).toHaveTextContent('Electric');
    expect(buttonTypes[1]).toHaveTextContent('Fire');
    fireEvent.click(buttonTypes[0]);
    const buttonNext = getByTestId(next);
    expect(buttonNext.disabled).toBe(true);
    fireEvent.click(buttonTypes[1]);
    expect(buttonNext.disabled).toBe(true);
  });
  it('Testa se a Pokédex tem um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
    let pokemonName = getByTestId(name);
    expect(pokemonName).toHaveTextContent(/Pikachu/);
    const buttonNext = getByTestId(next);
    fireEvent.click(buttonNext);
    pokemonName = getByTestId(name);
    expect(pokemonName).toHaveTextContent(/Charmander/);
  });
});
