import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from './RenderWithRouter';

test('Testa se página contém um `h2` com o texto `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2Text = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(h2Text).toBeInTheDocument();
});

test('Testa se exibe botão `próximo Pokémon`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nextButton = getByRole('button', {
    name: /próximo Pokémon/i,
  });
  expect(nextButton).toBeInTheDocument();
});

const pokeId = 'poke-name';

test('Testa se é mostrado apenas um Pokémon por vez', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const pokeName = getByTestId(pokeId);
  const nextButton = getByRole('button', {
    name: /próximo Pokémon/i,
  });
  fireEvent.click(nextButton);
  expect(pokeName.textContent).toBe('Charmander');
});

// Voltar aqui depois
test('Testa se estiver no ultimo pokemon e vai para o primeiro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const namePokemon = getByTestId(nameId);
  const nextButton = getByRole('button', { name: /Próximo pokémon/i });
  for (let index = 0; index < pokemonList.length; index += 1) {
    fireEvent.click(nextButton);
  }
  expect(namePokemon.textContent).toBe(pokemonList[0].name);
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  pokemonList.forEach(({ type }) => {
    const filterButton = getByRole('button', { name: type });

    fireEvent.click(filterButton);
    const currentPokemon = getByTestId('pokemon-type');
    expect(currentPokemon).toHaveTextContent(type);
  });
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const resetButton = getByRole('button', { name: 'All' });
  fireEvent.click(resetButton);
  const currentPokemon = getByTestId(nameId);
  expect(resetButton).toBeInTheDocument();
  expect(currentPokemon.textContent).toBe('Pikachu');
});

test('Teste se é cria um botão dinâmico de filtro para cada tipo de Pokémon', () => {
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

// test('', () => {});
