import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonsNames = pokemons.map(({ name }) => name);
const pokName = 'pokemon-name';

describe('Checks Pokedex component', () => {
  it('Checks if the page has an h2 with the text Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('Checks if it shows the next Pokémon of the list when clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeName = getByTestId(pokName);
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(nextPokemonButton).toBeInTheDocument();
    pokemonsNames.forEach((pokemon) => {
      expect(pokeName.textContent).toBe(pokemon);
      fireEvent.click(nextPokemonButton);
      expect(screen.getAllByTestId(pokName)).toHaveLength(1);
    });
    expect(pokeName).toHaveTextContent('Pikachu');
    fireEvent.click(nextPokemonButton);
    expect(pokeName).not.toHaveTextContent('Pikachu');
  });

  it('Checks if it shows the next Pokémon of the list by Type', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId('pokemon-type-button');
    typeButton.forEach((pokemon) => {
      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/ });
      fireEvent.click(pokemon);
      for (let index = 0; index < pokemonsNames.length; index += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(pokemon.textContent);
        fireEvent.click(nextPokemonButton);
      }
    });
  });
  it('Checks if theres a reset button with the text All', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
    console.log(allBtn);
    const pokeName = getByTestId(pokName);
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(allBtn).toHaveTextContent(/all/i);
  });
});
