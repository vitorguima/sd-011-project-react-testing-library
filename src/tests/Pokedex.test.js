import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import Data from '../data';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText(/Encountered pokémons/i);
    expect(text).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez',
    () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const btn = getByText(/Próximo pokémon/i);
      expect(btn).toBeInTheDocument();
      Data.forEach((pokemon) => {
        const pokemonId = getByTestId('pokemon-name');
        expect(pokemonId.innerHTML).toBe(pokemon.name);
        fireEvent.click(btn);
      });
    });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText(/All/i);
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const btnType = getAllByTestId('pokemon-type-button');
    const quantidadeBtn = 7;
    expect(btnType).toHaveLength(quantidadeBtn);
    const index = btnType[0];
    fireEvent.click(index);
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btnType = getAllByTestId('pokemon-type-button');
    expect(btnType[0]).toHaveTextContent('Electric');
    expect(btnType[1]).toHaveTextContent('Fire');
    expect(btnType[2]).toHaveTextContent('Bug');
    expect(btnType[3]).toHaveTextContent('Poison');
    expect(btnType[4]).toHaveTextContent('Psychic');
    expect(btnType[5]).toHaveTextContent('Normal');
    expect(btnType[6]).toHaveTextContent('Dragon');
  });
});
