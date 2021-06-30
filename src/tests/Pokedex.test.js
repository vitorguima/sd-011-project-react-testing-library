import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se existe a frase Encountered Pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const title = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
  expect(title).toBeInTheDocument();
});

test('Testa se é exibido o próximo pokemon', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const button = getByRole('button', { name: /Próximo pokémon/ });
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
  userEvent.click(button);
  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
  const n = 6;
  for (let index = 0; index < n; index += 1) {
    userEvent.click(button);
  }
  expect(pikachu).toBeInTheDocument();
});

test('Testa se apenas 1 pokemon é renderizado na tela', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const Pokemons = getAllByText(/kg/i);
  expect(Pokemons.length).toBe(1);
});

test('Testa o filtro de pokemons', () => {
  const { getAllByText, getByRole, queryByText } = renderWithRouter(<App />);
  const btn = getByRole('button', { name: /Psychic/i });
  userEvent.click(btn);
  const PsychicTexts = getAllByText(/Psychic/i);
  expect(PsychicTexts.length).toBe(2);
  const btnProx = getByRole('button', { name: /Próximo pokémon/ });
  userEvent.click(btnProx);
  expect(queryByText('Mew')).toBeInTheDocument();
  const PsychicTexts2 = getAllByText(/Psychic/i);
  expect(PsychicTexts2.length).toBe(2);
});

test('Testa o se botão ALL pokemnos retorna para todos novamente', () => {
  const { getAllByText, getByRole } = renderWithRouter(<App />);
  const btn = getByRole('button', { name: /All/i });
  userEvent.click(btn);
  const allEletric = getAllByText(/Electric/i);
  expect(allEletric.length).toBe(2);
  const btnProx = getByRole('button', { name: /Próximo pokémon/ });
  userEvent.click(btnProx);
  const allFire = getAllByText(/Fire/i);
  expect(allFire.length).toBe(2);
});

test('Testa se existe botões para cada tipo de pokemon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const btnNumbers = getAllByTestId('pokemon-type-button');
  const nbutton = 7;
  expect(btnNumbers.length).toBe(nbutton);
});

test('Testa se o botão próximo fica inativo', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const ElectricBtn = getByRole('button', { name: /Electric/i });
  userEvent.click(ElectricBtn);
  const btnProx = getByRole('button', { name: /Próximo pokémon/ });
  userEvent.click(btnProx);
  const pikachuPoke = getByText('Pikachu');
  expect(pikachuPoke).toBeInTheDocument();
});
