import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Testing the Pokedex component', () => {
  let getAllByRole;

  beforeAll(() => {
    ({ getAllByRole } = renderWithRouter(<App />));
  });

  it('Test if the component has a heading with specific text', () => {
    const heading = getAllByRole('heading');
    expect(heading[1]).toHaveTextContent(/Encountered pokémons/i);
  });

  it('Test if the next pokemon will appear if the button is pressed', () => {
    const { getByText } = renderWithRouter(<App />);

    const allPokedex = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    allPokedex.forEach((el, index) => {
      const button = getByText(/Próximo pokémon/i);
      userEvent.click(button);
      const newPokemon = getByText(el);
      expect(newPokemon).toBeInTheDocument();
    });
  });

  it('Test if only one component is shown', () => {
    const { getByText } = renderWithRouter(<App />);
    const img = getAllByRole('img');
    expect(img.length).toBe(1);
  });

  it('Test if there are filter buttons', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    const img = getAllByRole('img');
    expect(img.length).toBe(1);

    const filterTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    filterTypes.forEach((el) => {
      const button = getByRole('button', { name: el });
      userEvent.click(button);
      const pokemonType = getByTestId('pokemon-type').textContent;
      expect(pokemonType).toBe(el);
    });
  });

  it('Test if has filter reset button', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const ResetButton = getByRole('button', { name: 'All' });
    let type = 'Dragon';
    const dragonButton = getByRole('button', { name: type });
    userEvent.click(dragonButton);
    let pokemonType = getByTestId('pokemon-type').textContent;
    expect(pokemonType).toBe(type);
    userEvent.click(ResetButton);
    type = 'Electric';
    pokemonType = getByTestId('pokemon-type').textContent;
    expect(pokemonType).toBe(type);
  });

  it('Test if next pokemon button can be disabled', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    let type = 'Dragon';
    const AllButtons = getAllByTestId('pokemon-type-button');
    const dragonButton = AllButtons.find((el) => el.textContent === type);
    userEvent.click(dragonButton);
    const nextPokemon = getByTestId('next-pokemon');
    expect(nextPokemon).toHaveAttribute('disabled');
  });
});
