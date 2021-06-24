import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const pokeNames = Data.map(({ name }) => name);
const pokeType = Data.map(({ type }) => type);

it('Teste o Pokedex.js contém um heading h2 com o texto Encountered pokémons', () => {
  const { container } = renderWithRouter(<App />);
  const titlePage = container.querySelector('h2');
  expect(titlePage.textContent).toBe('Encountered pokémons');
});

it('Teste o se é exibido o próximo quando o botão Próximo pokémon é clicado', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonNext = getByText(/Próximo pokémon/i);
  expect(buttonNext).toBeInTheDocument();
  pokeNames.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    fireEvent.click(buttonNext);
  });
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});

it('Teste se a Pokédex tem os botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttonTypes = getAllByTestId('pokemon-type-button');
  const textButtonTypes = buttonTypes.map((button) => button.textContent);
  expect(pokeType.every((type) => textButtonTypes.includes(type))).toBeTruthy();
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText(/All/i);
  const buttonNext = getByText(/Próximo pokémon/i);
  fireEvent.click(buttonAll);
  pokeNames.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    fireEvent.click(buttonNext);
  });
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});
