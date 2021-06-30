import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokedex component', () => {
  const pokemonTypeButton = 'pokemon-type-button';
  const nextButton = 'Próximo pokémon';

  it('test if screen have a h2 title', () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const title = container.querySelector('h2');
    expect(title.innerHTML).toBe('Encountered pokémons');
  });

  it('test if next pokemon button is working', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const nextPokemon = getByText(nextButton);
    fireEvent.click(nextPokemon);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('test if next pokemon button is working, going to first one', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const nextPokemon = getByText(nextButton);
    pokemons.forEach(() => fireEvent.click(nextPokemon));
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('test if is showing only one pokemon at time', () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemon = container.querySelectorAll('.pokemon');
    expect(pokemon.length).toBe(1);
  });

  it('test if the filters buttons are working', () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const filterButtons = getAllByTestId(pokemonTypeButton);
    filterButtons.forEach((filterButton) => {
      fireEvent.click(filterButton);
      const pokemonType = getByTestId('pokemon-type');
      expect(filterButton.innerHTML).toBe(pokemonType.innerHTML);
    });
  });

  it('test if the reset filters button is working', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const resetFilter = getByText('All');
    fireEvent.click(resetFilter);
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('test has a filter button for each pokemon type', () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemonsTypes = [];
    pokemons.forEach((pokemon) => {
      if (!pokemonsTypes.includes(pokemon.type)) pokemonsTypes.push(pokemon.type);
    });
    const filterButtons = getAllByTestId(pokemonTypeButton);
    expect(pokemonsTypes.length).toBe(filterButtons.length);
  });

  it('test if the next button is not able when have only one pokemon', () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const filterButtons = getAllByTestId(pokemonTypeButton);
    filterButtons.forEach((filterButton) => {
      if (filterButton.innerHTML === 'Eletric') fireEvent.click(filterButton);
    });
    const pokemonName = getByTestId('pokemon-name');
    const nextPokemon = getByText(nextButton);
    fireEvent.click(nextPokemon);
    expect(pokemonName).toBeInTheDocument();
  });
});
