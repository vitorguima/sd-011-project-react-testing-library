import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test if Pokedex component is properly rendered', () => {
  it('test if page contains a h2 heading with Encountered Pokémons text', () => {
    const { container } = renderWithRouter(<App />);
    const encountered = container.querySelector('h2');
    expect(encountered.textContent).toBe('Encountered pokémons');
  });

  describe('Test if next Pokemon is shown when Proximo Pokemon is clicked', () => {
    it('button needs to have Proximo Pokemon text', () => {
      const { container } = renderWithRouter(<App />);
      const nextPokemon = container.querySelectorAll('button');
      expect(nextPokemon[8].textContent).toBe('Próximo pokémon');
    });

    it('test if nextPokemon is shown after clicking on the button', () => {
      const pokemonList = pokemons.map(({ name }) => name);
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const btn = getByTestId('next-pokemon');
      pokemonList.forEach((pokemon) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(btn);
      });
      expect(getByText('Pikachu')).toBeInTheDocument();
    });
  });

  it('test if Pokedex has a button wich can reset the filter', () => {
    const pokemon = pokemons.map(({ name }) => name);
    const { getByText } = renderWithRouter(<App />);
    const all = getByText(/All/i);
    const btn = getByText(/Próximo pokémon/i);
    fireEvent.click(all);
    pokemon.forEach((poke) => {
      expect(getByText(poke)).toBeInTheDocument();
      fireEvent.click(btn);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('test a filter button for each Pokemon type.', () => {
    const pokemon = pokemons.map(({ type }) => type);
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterbtn = getAllByTestId('pokemon-type-button');
    const typeBtn = filterbtn.map((btnType) => btnType.textContent);
    const checkFilter = pokemon.every((type) => typeBtn.includes(type));
    expect(checkFilter).toBe(true);
  });
});
