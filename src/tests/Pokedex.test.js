import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

const nextBtn = 'Próximo pokémon';
const pokeType = 'pokemon-type';
const pokeTypeBtn = 'pokemon-type-button';

test('Renderiza o título `Page requested not found`', () => {
  const { getByText } = renderWithRouter(<App />);

  const title = getByText(/Encountered pokémons/i);

  expect(title).toBeInTheDocument();
});

test('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
  () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(nextBtn);

    fireEvent.click(button);

    expect(getByText(/charmander/i)).toBeInTheDocument();

    fireEvent.click(button);

    expect(getByText(/caterpie/i)).toBeInTheDocument();
  });

test(
  'Volta ao primeiro pokemon se clicar \'Pŕoximo pokémon\' estando no último pokémon',
  () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(nextBtn);

    expect(getByText(/pikachu/i)).toBeInTheDocument();

    pokemons.forEach(() => {
      fireEvent.click(button);
    });

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  },
);

test('É mostrado apenas um pokémon por vez', () => {
  const { getByText } = renderWithRouter(<App />);
  const button = getByText(nextBtn);

  pokemons.forEach(() => {
    const pokemonCards = document.querySelectorAll('.pokemon');
    expect(pokemonCards.length).toBe(1);
    fireEvent.click(button);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Devem circular somente pelos pokémons do tipo selecionado', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId(pokeTypeBtn);
    const nextPoke = getByText(nextBtn);

    const button = typeButtons[1];
    const type = button.textContent;

    fireEvent.click(button);
    expect(getByTestId(pokeType)).toHaveTextContent(type);

    fireEvent.click(nextPoke);
    expect(getByTestId(pokeType)).toHaveTextContent(type);

    fireEvent.click(nextPoke);
    expect(getByTestId(pokeType)).toHaveTextContent(type);
  });

  test('O texto do botão deve corresponder ao nome do tipo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId(pokeTypeBtn);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const typeButtons = buttons.map((button) => button.textContent);

    expect(types).toEqual(typeButtons);
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetFilter = getByText('All');
    expect(resetFilter).toBeInTheDocument();
  });

  test('Devem ser mostrados todos os pokemons quando o botão `All` for clicado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const button = getByText(nextBtn);
    const resetFilter = getByText('All');
    fireEvent.click(resetFilter);
    pokemons.forEach(({ name }) => {
      const pokeName = getByTestId('pokemon-name');
      expect(pokeName).toHaveTextContent(name);
      fireEvent.click(button);
    });
  });

  test(
    'O botão `Próximo pokémon` deve ser desabilitado quando a lista tiver um só pokémon',
    () => {
      const { getByText, getAllByTestId } = renderWithRouter(<App />);
      const button = getByText(nextBtn);
      const setFilter = getAllByTestId(pokeTypeBtn)[0];
      fireEvent.click(setFilter);
      expect(button).toBeDisabled();
    },
  );
});
