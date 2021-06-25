import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { Pokedex } from '../components';
import Data from '../data';

const POKEMONS = Data;

const ID = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: true,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Verifica requisito 5', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons..', () => {
    renderWithRouter(<Pokedex pokemons={ POKEMONS } isPokemonFavoriteById={ ID } />);
    const h2 = screen.getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });
});

it('Teste se é exibido o próximo Pokémon quando botão Próximo pokémon é clicado.', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={ POKEMONS }
    isPokemonFavoriteById={ ID }
  />);

  const btnAll = getByText(/All/i);
  fireEvent.click(btnAll);
  const btn = getByText(/Próximo pokémon/i);
  expect(btn).toBeInTheDocument();

  POKEMONS.forEach(({ name }) => {
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(btn);
  });
  expect(getByText('Pikachu')).toBeInTheDocument();
});

it('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ POKEMONS }
    isPokemonFavoriteById={ ID }
  />);

  const btnFilter = getAllByTestId('pokemon-type-button');
  const btnPsy = btnFilter.find((button) => button.textContent === 'Psychic');
  expect(btnPsy).toBeInTheDocument();
  fireEvent.click(btnPsy);
  expect(getByText('Alakazam')).toBeInTheDocument();

  const btnNextFilter = getByText(/Próximo pokémon/i);
  fireEvent.click(btnNextFilter);
  expect(getByText('Mew')).toBeInTheDocument();
});
