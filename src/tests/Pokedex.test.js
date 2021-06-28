import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

test('Teste se `h2` tem o texto `Encountered pokémons`', () => {
  const { container } = renderWithRouter(<App />);
  expect(container.innerHTML).toMatch('Encountered pokémons');
});

test('Teste se é exibido o próximo Pokémon da lista', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const nextBtn = getByText(/Próximo pokémon/i);

  for (let index = 0; index < Data.length; index += 1) {
    const next = Data[index].name;
    expect(container.innerHTML).toMatch(next);
    fireEvent.click(nextBtn);
  }
});

test('Teste se NÃO é exibido DOIS Pokémon ao clicar em "Próximo pokémon"', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const nextBtn = getByText(/Próximo pokémon/i);

  Data.forEach((item, index) => {
    if (index < Data.length - 1) {
      const next = Data[index + 1].name;
      expect(container.innerHTML).not.toMatch(next);
    }
    fireEvent.click(nextBtn);
  });
});

test('Teste se retorna o primeiro ao clicar no último', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const nextBtn = getByText(/Próximo pokémon/i);

  for (let index = 0; index <= Data.length; index += 1) {
    if (index < Data.length) {
      const next = Data[index].name;
      expect(container.innerHTML).toMatch(next);
    } else {
      const last = Data[0].name;
      expect(container.innerHTML).toMatch(last);
    }
    fireEvent.click(nextBtn);
  }
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { container } = renderWithRouter(<App />);
  expect(container.innerHTML).toMatch('All');
  expect(container.innerHTML).toMatch('Electric');
  expect(container.innerHTML).toMatch('Fire');
  expect(container.innerHTML).toMatch('Bug');
  expect(container.innerHTML).toMatch('Poison');
  expect(container.innerHTML).toMatch('Psychic');
  expect(container.innerHTML).toMatch('Normal');
  expect(container.innerHTML).toMatch('Dragon');
});

test('Circular apenas pelo tipo escolhido', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const nextBtn = getByText(/Próximo pokémon/i);

  const fire = Data.filter((item) => item.type === 'Fire');
  const fireBtn = getByText(/Fire/i);
  fireEvent.click(fireBtn);

  for (let index = 0; index <= fire.length; index += 1) {
    if (index < fire.length) {
      const next = fire[index].name;
      expect(container.innerHTML).toMatch(next);
    } else {
      const last = fire[0].name;
      expect(container.innerHTML).toMatch(last);
    }
    fireEvent.click(nextBtn);
  }
});

test('Teste se reset (All) funciona', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const resetBtn = getByText(/All/i);
  const nextBtn = getByText(/Próximo pokémon/i);

  fireEvent.click(resetBtn);
  for (let index = 0; index <= Data.length; index += 1) {
    if (index < Data.length) {
      const next = Data[index].name;
      expect(container.innerHTML).toMatch(next);
    } else {
      const last = Data[0].name;
      expect(container.innerHTML).toMatch(last);
    }
    fireEvent.click(nextBtn);
  }
});

test('Teste se os botões de tipo são criados dinamicamente', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

  const typeButton = getAllByTestId('pokemon-type-button');
  typeButton.forEach((type) => {
    fireEvent.click(type);
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType.textContent).toEqual(type.textContent);
  });
});
