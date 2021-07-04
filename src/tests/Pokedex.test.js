import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se contém um heading com Encountered Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokeHeading = getByText(/Encountered pokémons/);
  expect(pokeHeading).toBeInTheDocument();
});

test('Se é exibido o próximo pokémon quando clica', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const firstPoke = getByText(/Pikachu/);
  expect(firstPoke).toBeInTheDocument();
  const nextButton = getByTestId(/next-pokemon/);
  fireEvent.click(nextButton);
  const nextPoke = getByText(/Charmander/);
  expect(nextPoke).toBeInTheDocument();
});

test('Se é exibido apenas um pokemon por vez', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const pokeLen = container.querySelectorAll('.pokedex');
  expect(pokeLen.length).toBe(1);
  const nextButton = getByText('Próximo pokémon');
  const type = container.querySelectorAll('.pokemon-type');

  if (type.length === 1) {
    expect(nextButton).toBeDisabled();
  }
});

test('Se existem os botões de filtro', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  const buttonLen = getAllByTestId(/pokemon-type-button/);
  expect(buttonLen[0].innerHTML).toBe('Electric');
  expect(buttonLen[1].innerHTML).toBe('Fire');
  expect(buttonLen[2].innerHTML).toBe('Bug');
  expect(buttonLen[3].innerHTML).toBe('Poison');
  expect(buttonLen[4].innerHTML).toBe('Psychic');
  expect(buttonLen[5].innerHTML).toBe('Normal');
  expect(buttonLen[6].innerHTML).toBe('Dragon');

  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();
});

test('Se contem um botao para resetar filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();
  fireEvent.click(allButton);
  const initialPokemon = getByText(/Pikachu/);
  expect(initialPokemon).toBeInTheDocument();
});
