import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('5 - Tests the Pokedex component', () => {
  it('should display "Encountered pokémons" within an h2 tag', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2Text = getByText(/Encountered pokémons/);
    expect(h2Text).toBeInTheDocument();
  });

  it('should display the next Pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).toHaveTextContent(/Próximo pokémon/);

    pokemons.forEach((item) => {
      const poke = getByTestId('pokemon-name');
      expect(item.name).toEqual(poke.innerHTML);
      fireEvent.click(nextBtn);
    });
  });

  it('should display only one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonsLength = getAllByTestId('pokemon-name').length;
    expect(pokemonsLength).toBe(1);
  });

  it('should display 7 specific filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypes = getAllByTestId('pokemon-type-button').length;
    const length = 7;
    expect(pokemonTypes).toBe(length);
  });

  it('should display only types of the clicked button', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnType = getByText('Psychic');
    fireEvent.click(btnType);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Psychic');
  });

  it('should have a reset button', () => {
    const { getByText } = renderWithRouter(<App />);
    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(allBtn);
    const pokemonShown = getByText(/Pikachu/);
    expect(pokemonShown).toBeInTheDocument();
  });
});
