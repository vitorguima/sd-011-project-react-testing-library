import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

it('Verifica se a pagina contem um h2', () => {
  const { getByRole } = renderWithRouter(<App />);

  const h2 = getByRole('heading', { level: 2 });
  expect(h2.textContent).toBe('Encountered pokémons');
});

it('Verifica se é exibido o próximo Pokémon', () => {
  const { getByText } = renderWithRouter(<App />);

  const nextPokemon = getByText(/Próximo pokémon/);
  fireEvent.click(nextPokemon);

  const charmander = getByText(/Charmander/);
  expect(charmander).toBeInTheDocument();
  fireEvent.click(nextPokemon);

  const caterpie = getByText(/Caterpie/);
  expect(caterpie).toBeInTheDocument();
  fireEvent.click(nextPokemon);
  fireEvent.click(nextPokemon);
  fireEvent.click(nextPokemon);
  fireEvent.click(nextPokemon);
  fireEvent.click(nextPokemon);
  fireEvent.click(nextPokemon);
  fireEvent.click(nextPokemon);

  const pikachu = getByText(/Pikachu/);
  expect(pikachu).toBeInTheDocument();
});

it('Verifica se mostra apenas um pokemon por vez', () => {
  const { container } = renderWithRouter(<App />);

  const pokemon = container.querySelectorAll('.pokemon');
  expect(pokemon.length).toBe(1);
});

it('Verifica se a Pokedex tem botao de filtro', () => {
  const { getByText } = renderWithRouter(<App />);

  const fireButton = getByText(/Fire/);
  fireEvent.click(fireButton);
  const nextPokemon = getByText(/Próximo pokémon/);

  const charmander = getByText(/Charmander/);
  expect(charmander).toBeInTheDocument();
  fireEvent.click(nextPokemon);

  const rapidash = getByText(/Rapidash/);
  expect(rapidash).toBeInTheDocument();
});

it('Verifica se a POkedex tem um botao All', () => {
  const { getByText } = renderWithRouter(<App />);

  const allButton = getByText(/All/);
  fireEvent.click(allButton);

  const pikachu = getByText(/Pikachu/);
  expect(pikachu).toBeInTheDocument();
});

it('Verifica se os botoes de filtro sao criados dinamicamnete', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const typesButtons = getAllByTestId('pokemon-type-button');
  const typesLength = 7;
  expect(typesButtons.length).toBe(typesLength);
});
