import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';
// import Pokedex from '../components/Pokedex';

it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', { level: 2 });

  expect(heading.textContent).toBe('Encountered pokémons');
});

it('Teste se é exibido o próximo Pokémon da lista', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const all = getByText('All');
  fireEvent.click(all);

  const nextB = getByText('Próximo pokémon');
  Data.forEach((poke) => {
    const pokeName = getByText(poke.name);
    expect(pokeName).toBeInTheDocument();
    fireEvent.click(nextB);
  });
  const pikachu = getByTestId('pokemon-name');
  expect(pikachu.textContent).toBe('Pikachu');
});

it('Teste se a Pokédex tem os botões de filtro', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<App />);

  const typeButton = getAllByTestId('pokemon-type-button');
  typeButton.forEach((tipo) => {
    fireEvent.click(tipo);
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType.textContent).toEqual(tipo.textContent);
  });
});
