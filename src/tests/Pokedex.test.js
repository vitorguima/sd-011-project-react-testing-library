import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const namePokes = pokemons.map(({ name }) => name);
const pokeNameTestId = 'pokemon-name';
const nextPokeTestId = 'Próximo pokémon';

describe('Requisito 5', () => {
  it('contem heading h2', () => {
    const { container } = renderWithRouter(<App />);
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('Encountered pokémons');
  });

  it('mostra o proximo pokemon da lista quando clicado no botão', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId(pokeNameTestId);
    const nextPokemon = getByText(nextPokeTestId);
    namePokes.forEach((e) => {
      const poke = getByTestId(pokeNameTestId);
      expect(poke.textContent).toBe(e);
      fireEvent.click(nextPokemon);
    });
    expect(pokemon.textContent).toBe('Pikachu');
  });

  it('pokemons por tipo', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);
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

  it('começa renderizando o all e ele renderiza todos poke', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
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
