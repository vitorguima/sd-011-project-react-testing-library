import React from 'react';
import App from '../App';
import { fireEvent, getAllByTestId } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

describe('testing Pokedex Page', () => {
  it('testing if the heading is h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const checkText = getByRole('heading', { level: 2 });
    expect(checkText).toHaveTextContent('Encountered pokémons');
  });

  it('testing "Próximo pokémon" button', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const nextPokemon = getByRole('button', { name: /Próximo pokémon/ });
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const n = 7;
    for (let i = 0; i < n; i += 1){
      fireEvent.click(nextPokemon)
    }
    expect(pikachu).toBeInTheDocument();
  });

  it('testing if shows only one pokemon at a time', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemon = getAllByText(/details/i);
    expect(pokemon.length).toEqual(1);
  });

  it('testing Pokedex filter button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const all = getByRole('button', { name: /All/i});
    const fire = getByRole('button', { name: /Fire/i});
    const bug = getByRole('button', { name: /Bug/i});
    const poison = getByRole('button', { name: /Poison/i});
    const psychic = getByRole('button', { name: /Psychic/i});
    const normal = getByRole('button', { name: /Normal/i});
    const dragon = getByRole('button', { name: /Dragon/i});
    expect(all).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
  });

  it('testing Pokedex reset filter button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    const pikachu = getByText(/Pikachu/i);
    fireEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });

  it('testing if a button filter is dynamically for every type of Pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(7);
  });

  it('testing if "Próximo pokémon" is disabled when theres only one Pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextPokemon = getByRole('button', { name: /Próximo pokémon/ });
    const bug = getByRole('button', { name: /Bug/i});
    fireEvent.click(bug)
    expect(nextPokemon).toBeDisabled
    const poison = getByRole('button', { name: /Poison/i});
    fireEvent.click(poison)
    expect(nextPokemon).toBeDisabled
    const normal = getByRole('button', { name: /Normal/i});
    fireEvent.click(normal)
    expect(nextPokemon).toBeDisabled
    const dragon = getByRole('button', { name: /Dragon/i});
    fireEvent.click(dragon)
    expect(nextPokemon).toBeDisabled
  });
});
