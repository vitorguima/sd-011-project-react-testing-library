import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Test the "Pokedex" requirements', () => {
  test('Test if the page contains a text "Encountered pokemons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Test if when the "Next Pokemon" button is clicked it shows next pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemon = getByTestId(pokeNameTestId);
    const nextPokemon = getByText(nextPokeTestId);
    namePokes.forEach((e) => {
      const poke = getByTestId(pokeNameTestId);
      expect(poke.textContent).toBe(e);
      fireEvent.click(nextPokemon);
    });
    expect(pokemon.textContent).toBe('Pikachu');
  });

  it('pokemons by type', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const typeButtons = getAllByTestId('pokemon-type-button');
    const nextPokemon = getByText(nextPokeTestId);
    typeButtons.forEach((e) => {
      fireEvent.click(e);
      console.log(e.textContent);
      for (let index = 0; index < namePokes.length; index += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(e.textContent);
        fireEvent.click(nextPokemon);
      }
    });
  });

  it('starts rendering all and it renders all pokemons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemon = getByText(nextPokeTestId);
    const allPokemon = getByText('All');
    expect(allPokemon).toBeInTheDocument();
    fireEvent.click(allPokemon);

    namePokes.forEach((e) => {
      expect(getByTestId(pokeNameTestId).textContent).toBe(e);
      fireEvent.click(nextPokemon);
    });
  });
});
