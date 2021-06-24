import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const nextPokemon = 'next-pokemon';
const pokemonNameId = 'pokemon-name';

it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { container } = renderWithRouter(<App />);
  const h2 = container.querySelector('h2');
  expect(h2).toHaveTextContent(/Encountered pokémons/i);
});

it('Teste se é exibido o próximo Pokémon da lista quando o botão ', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const nextButton = getByTestId(nextPokemon);
  expect(nextButton).toHaveTextContent(/Próximo pokémon/i);
  const pokemonName = getByTestId(pokemonNameId);
  expect(pokemonName).toHaveTextContent(data[0].name);
  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[1].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[2].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[3].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[4].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[5].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[6].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[7].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[8].name);

  fireEvent.click(nextButton);
  expect(pokemonName).toHaveTextContent(data[0].name);
});

it('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemon = getAllByTestId('pokemon-name');
  expect(pokemon).toHaveLength(1);
});

it('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const fireTypeButton = getByText(/Fire/i);
  const psychicTypeButton = getByText(/Psychic/i);
  const nextButton = getByTestId(nextPokemon);
  const pokemonType = getByTestId('pokemon-type');

  expect(nextButton).toHaveTextContent(/Próximo pokémon/i);

  fireEvent.click(fireTypeButton);
  expect(pokemonType).toHaveTextContent('Fire');

  fireEvent.click(nextButton);
  expect(pokemonType).toHaveTextContent('Fire');

  fireEvent.click(psychicTypeButton);
  expect(pokemonType).toHaveTextContent('Psychic');

  fireEvent.click(nextButton);
  expect(pokemonType).toHaveTextContent('Psychic');
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const nextButton = getByTestId(nextPokemon);
  const resetButton = getByText(/All/i);
  fireEvent.click(resetButton);

  expect(nextButton).toHaveTextContent(/Próximo pokémon/i);
  const pokemonNames = getByTestId(pokemonNameId);
  expect(pokemonNames).toHaveTextContent(data[0].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[1].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[2].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[3].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[4].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[5].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[6].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[7].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[8].name);

  fireEvent.click(nextButton);
  expect(pokemonNames).toHaveTextContent(data[0].name);
});

it('Teste se é criado, dinamicamente', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const typeButtons = getAllByTestId('pokemon-type-button');

  const allButton = getByText(/All/i);

  const numberOfTypes = 7;
  expect(typeButtons).toHaveLength(numberOfTypes);
  expect(allButton).toBeInTheDocument();
});

it('O botão de Próximo pokémon deve ser desabilitado ', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const nextButton = getByTestId(nextPokemon);
  expect(nextButton).toHaveTextContent(/Próximo pokémon/i);

  const bugTypeButton = getByText(/Bug/i);
  fireEvent.click(bugTypeButton);

  expect(nextButton).toBeDisabled();
});
