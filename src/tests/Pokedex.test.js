import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

const nextPokemonButton = 'Próximo pokémon';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const title = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(title).toBeInTheDocument();
});

test('O botão deve conter o texto Próximo pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const clickNextButton = getByRole('button', { name: nextPokemonButton });
  expect(clickNextButton).toBeInTheDocument();
});

test('Os próximos Pokémons da lista devem ser mostrados, um a um', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const clickNextButton = getByRole('button', { name: nextPokemonButton });
  expect(clickNextButton).toBeInTheDocument();
  for (let count = 0; count < data.lenght; count += 1) {
    fireEvent.click(clickNextButton);
  }
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { queryByText } = renderWithRouter(<App />);
  expect(queryByText('Pikachu')).toBeInTheDocument();
  expect(queryByText('Charmander')).not.toBeInTheDocument();
  expect(queryByText('Caterpie')).not.toBeInTheDocument();
});

test('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
  const { queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByText('Fire'));
  expect(queryByText('Charmander')).toBeInTheDocument();
  fireEvent.click(queryByText(nextPokemonButton));
  expect(queryByText('Charmander')).not.toBeInTheDocument();
  expect(queryByText('Rapidash')).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { queryByRole, queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByRole('button', { name: 'All' }));
  expect(queryByText('All')).toBeInTheDocument();
});

test('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const id = (getAllByTestId('pokemon-type-button')[0]);
  expect(id).toBeInTheDocument();
});
