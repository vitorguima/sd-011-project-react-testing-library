import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('testa h2 e texto', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2 = getByRole('heading', { level: 2 });
  expect(h2.innerHTML).toContain('Encountered pokémons');
  expect(h2).toBeInTheDocument();
});

test('testa botão se tem o texto', () => {
  const { getByText } = renderWithRouter(<App />);
  const btn = getByText(/Próximo pokémon/i);
  expect(btn).toBeInTheDocument();
});

test('test click ', () => {
  const { getByText } = renderWithRouter(<App />);
  const evento = fireEvent.click(getByText(/All/i));
  // console.log(evento); não precisava do expect
  expect(evento).toBe(true);
});

test('testa botão all', () => {
  const { getByRole } = renderWithRouter(<App />);
  const btn = getByRole('button', { name: /All/i });
  // expect(btn).not.toBeInTheDocument();
  expect(btn).toBeInTheDocument();
});

test('testa se tem apenas um por vez', () => {
  const { container } = renderWithRouter(<App />);
  const pokemonLength = container.querySelectorAll('.pokemon');
  // console.log( ...pokemonLength );
  // console.log( pokemonLength[0].innerHTML );
  expect(pokemonLength.length).toBe(1);
});
/* test ('testa se tem 7 botoes', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemonLength = getAllByTestId('pokemon-name');
  console.log(pokemonLength.length);
}); */

test('testa se tem 7 botoes para filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const numero = 7;
  const pokemonLength = getAllByTestId('pokemon-type-button');
  // console.log( pokemonLength.length );
  expect(pokemonLength.length).toBe(numero);
});

test('testa botões electric', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /electric/i,
  });
  expect(btn.length).toBe(1);
});

test('testa botões fire', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /fire/i,
  });
  expect(btn.length).toBe(1);
});

test('testa botões bug', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /bug/i,
  });
  expect(btn.length).toBe(1);
});

test('testa botões poison', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /poison/i,
  });
  expect(btn.length).toBe(1);
});

test('testa botões psychic ', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /psychic/i,
  });
  expect(btn.length).toBe(1);
});

test('testa botões normal', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /normal/i,
  });
  expect(btn.length).toBe(1);
});

test('testa botões dragon ', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const btn = getAllByRole('button', {
    name: /dragon/i,
  });
  expect(btn.length).toBe(1);
});
