import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testa o componente Pokedex', () => {
  let favorite;
  function setFavoritePokemonObject() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    return isPokemonFavorite;
  }

  beforeEach(() => {
    favorite = setFavoritePokemonObject();
  });

  it('Testa se a página tem um h2 com o texto `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/encountered pokémons/i);
  });

  it('Testa se é exibido proximo pokemon ao clicar em proximo pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const firstPokemon = getByTestId('pokemon-name').innerText;
    const nextBtn = getByTestId('next-pokemon');
    pokemons.forEach(() => {
      fireEvent.click(nextBtn);
    });
    const selectedPokemon = getByTestId('pokemon-name').innerText;
    expect(firstPokemon).toBe(selectedPokemon);
  });

  it('Testa se é exibido somente um pokemon por vez`', () => {
    const { getByTestId, container } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    let pokemon = container.getElementsByClassName('pokemon');
    const nextBtn = getByTestId('next-pokemon');
    expect(pokemon.length).toBe(1);
    fireEvent.click(nextBtn);
    pokemon = container.getElementsByClassName('pokemon');
    expect(pokemon.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const filterBtns = getAllByTestId('pokemon-type-button');
    const expectedButtons = 7;
    expect(filterBtns.length).toBe(expectedButtons);
    const random = Math.floor(Math.random() * filterBtns.length);
    fireEvent.click(filterBtns[random]);
    const selectedPokemon = getByTestId('pokemon-type').innerText;
    expect(selectedPokemon).toBe(filterBtns[random].innerText);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro `All`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const btn = getByText('All');
    expect(btn).toBeInTheDocument();
  });

  it('Testa se é criado dinamicamente os botãos de filtro de pokémon', () => {
    const { queryByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const list = [];
    pokemons.forEach((el) => list.push(el.type));
    const test = queryByTestId('test');
    expect(test).not.toBeInTheDocument();
  });
});
