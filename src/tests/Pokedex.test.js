import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('requirement 5 - test the Pokedex.js component', () => {
  it('page contains heading h2 with text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(text).toBeInTheDocument();
  });

  it('display the next Pokémon in the list when you click the Next button', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button.textContent).toBe('Próximo pokémon');
    userEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('only one pokemon is shown at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('has the filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButton = getAllByTestId('pokemon-type-button');
    expect(filterButton[0]).toHaveTextContent('Electric');
  });

  it('contains a button to reset the filter', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const pikachu = getByText('Pikachu');
    const buttonReset = getByRole('button', { name: /all/i });
    userEvent.click(buttonReset);
    expect(pikachu).toBeInTheDocument();
  });

  it('filter button is dinamically created for earch type pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button, index) => {
      const pokeTypes = ['Electric', 'Fire', 'Bug', 'Poison',
        'Psychic', 'Normal', 'Dragon'];
      expect(button.textContent).toEqual(pokeTypes[index]);
    });
  });

  it('button is disabled when the pokemon list has only one pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Próximo pokémon/i });
    const dragonPokemon = getByText(/Dragon/i);
    userEvent.click(dragonPokemon);
    expect(button).toBeDisabled();
  });
});
