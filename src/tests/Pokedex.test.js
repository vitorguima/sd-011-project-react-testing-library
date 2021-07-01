import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Checking the functions of page pokedex', () => {
  it('Test if page contain the text "Encountered pokémons"', () => {
    const { getByText, container } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { } }
    />);
    const textHeading = getByText(/Encountered pokémons/i);
    expect(textHeading).toBeInTheDocument();
    const heading = container.querySelectorAll('h2');
    expect(heading.length).toBe(1);
  });

  it('Test if next pokémon on the list is shown', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnNext = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNext).toBeInTheDocument();
  });

  it('Test if exist a reset buton', () => {
    const namePokemon = 'pokemon-name';
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const resetButton = getByRole('button', { name: 'All' });
    fireEvent.click(resetButton);
    const PokemonSelected = getByTestId(namePokemon);
    expect(resetButton).toBeInTheDocument();
    expect(PokemonSelected.textContent).toBe('Pikachu');
  });

  it('Test the buttons of filters', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const filterButton = getByRole('button', { name: type });
      fireEvent.click(filterButton);
      const PokemonSelected = getByTestId('pokemon-type');
      expect(PokemonSelected).toHaveTextContent(type);
    });
  });
  it('Test if is Created button dynamic', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const List = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    buttons.forEach((button, index) => {
      expect(button.textContent).toBe(List[index]);
    });
  });
});
