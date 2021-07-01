import React from 'react';
import { fireEvent } from '@testing-library/react';
import pokemonList from '../data';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('Testa se exibe um h2 com o texto `encountered pokemons`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const headingText = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(headingText).toBeInTheDocument();
});

test('Testa se existe o botão de `Próximo Pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nextButton = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(nextButton).toBeInTheDocument();
});

const pokeId = 'pokemon-name';

test('Testa se é mostrado um pokemon por vez', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const namePokemon = getByTestId(pokeId);
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  fireEvent.click(button);
  expect(namePokemon.textContent).toBe('Charmander');
});

test('Testa se estiver no ultimo pokemon e vai para o primeiro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const namePokemon = getByTestId(pokeId);
  const button = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  for (let index = 0; index < pokemonList.length; index += 1) {
    fireEvent.click(button);
  }
  expect(namePokemon.textContent).toBe(pokemonList[0].name);
});

test('Testa se tem botoes de filtro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);

  pokemonList.forEach(({ type }) => {
    const filterButton = getByRole('button', { name: type });
    fireEvent.click(filterButton);
    const currentPokemon = getByTestId('pokemon-type');
    expect(currentPokemon).toHaveTextContent(type);
  });
});

test('Testa se tem botao de resetar filtro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const resetButton = getByRole('button', { name: 'All' });
  fireEvent.click(resetButton);
  const currentPokemon = getByTestId(pokeId);
  expect(resetButton).toBeInTheDocument();
  expect(currentPokemon.textContent).toBe('Pikachu');
});

test('Testa se é criado um botao de filtro para cada Pokemon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttonsType = getAllByTestId('pokemon-type-button');
  const pokemons = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  buttonsType.forEach((button, index) => {
    expect(button.textContent).toBe(pokemons[index]);
  });
});
