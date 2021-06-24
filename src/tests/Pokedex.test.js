import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokedexText = getByText('Encountered pokémons');
  expect(pokedexText).toBeInTheDocument();
});

test(
  'Teste se é exibido o próximo Pokémon dalista quando o botão Próximo pokémon é clicado',
  () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonBtn = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonBtn);
    expect(getByText('Charmander')).toBeInTheDocument();
  },
);

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  const resetFilterBtn = getByText('All');
  fireEvent.click(resetFilterBtn);
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test(
  'Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon',
  () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const allButtons = getAllByRole('button');
    expect(allButtons.filter((e) => e.textContent === 'All').length).toBe(1);
  },
);
