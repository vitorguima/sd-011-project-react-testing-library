import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('All tests of Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading',
      { level: 2, name: /Encountered pokémons/i })).toBeInTheDocument();
  });

  test('Exibido próximo Pokémon da lista quando botão Próximo pokémon é clicado', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const btn = getByRole('button', { name: /próximo pokémon/i });
    expect(btn).toBeInTheDocument();

    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    fireEvent.click(btn);
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    expect(getAllByTestId('pokemon-name').length).toEqual(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('button', { name: /All/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Fire/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Bug/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Poison/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Psychic/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Normal/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Dragon/i })).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    const resetButton = getByRole('button', { name: /All/i });
    const allPokemons = 8;

    fireEvent.click(resetButton);

    for (let i = 0; i <= allPokemons; i += 1) {
      fireEvent.click(nextPokemon);
    }

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const typeButtons = 7;
    expect(getAllByTestId('pokemon-type-button').length).toEqual(typeButtons);
  });
});
