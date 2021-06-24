import { fireEvent } from '@testing-library/dom';
import React from 'react';
import Pokedex from '../components/Pokedex';
import data from '../data';
import renderWithRouter from '../RenderWithRouter';

const isFavorite = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const types = data.reduce((acc, { type }) => (
  acc.includes(type) ? acc : acc.concat(type)), []);

describe('Pokedex tests', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isFavorite } />,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon qd o botão Próx pokémon é clicado.', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isFavorite } />,
    );
    expect(getByText('Pikachu')).toBeInTheDocument();
    const btnNext = getByTestId('next-pokemon');
    expect(btnNext.textContent).toBe('Próximo pokémon');
    data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(btnNext);
      expect(getAllByTestId('pokemon-name')).toHaveLength(1);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isFavorite } />,
    );
    const btnTypes = getAllByTestId('pokemon-type-button');
    expect(btnTypes).toHaveLength(types.length);
    btnTypes.forEach((type) => {
      const btn = type;
      fireEvent.click(btn);
      expect(getByTestId('pokemon-type').textContent).toBe(type.textContent);
    });
    const btnAll = getByText('All');
    fireEvent.click(btnAll);
    const btnNext = getByTestId('next-pokemon');
    data.forEach((poke) => {
      expect(getByText(poke.name)).toBeInTheDocument();
      fireEvent.click(btnNext);
      expect(getAllByTestId('pokemon-name')).toHaveLength(1);
    });
  });
});
