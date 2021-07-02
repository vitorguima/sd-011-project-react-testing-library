import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('A página deve exibir o próximo pokémon da lista', () => {
  const { getBytestId, getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  // botao
  const btnNext = getBytestId('next-pokemon');
  expect(btnNext).toBeInTheDocument();
  const pokemonsNames = [
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
    'Pikachu',
  ];
  for (let i = 0; i < pokemonsNames.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(pokemonsNames[i])).toBeInTheDocument();
    expect(getAllByText(/Average weight/i)).toHaveLength(1);
  }
});

test('A Pokedex deve conter botões de filtro', () => {
  const { getByText, getAllByTextId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const btnFilter = getAllByTextId('pokemon-type-button');
  const number = 7;
  expect(btnFilter.length).toBe(number);
  fireEvent.click(getByText(/Psychic/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
  fireEvent.click(getByText(/próximo pokémon/i));
  fireEvent.click(getByText(/próximo pokémon/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
});

test('A Pokédex deve conter um botão para resetar o filtro', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const btnAll = getByText('All');
  fireEvent.click(getByText('Fire'));
  fireEvent.click(btnAll);
  const allPokeNames = [
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
    'Pikachu',
  ];
  for (let i = 0; i < allPokeNames.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(allPokeNames[i])).toBeInTheDocument();
    expect(getAllByText(/More details/i).length).toBe(1);
  }
});

test('Killing the h2', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Encounterd pokémons/i)).toBeInTheDocument();
});
