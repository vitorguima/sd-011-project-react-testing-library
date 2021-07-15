import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';
import App from '../App';

describe('Test the <Pokedex.js /> component', () => {
  const Pokemons = Data.map(({ name }) => name);
  const typePokemons = Data.map(({ type }) => type);
  test('test component', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const title = container.querySelector('h2');
    expect(title.textContent).toBe('Encountered pokémons');

    const Button = getByText(/Próximo pokémon/);
    expect(Button).toBeInTheDocument();

    Pokemons.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(Button);
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Test if the Pokédex has the filter buttons.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonType = getAllByTestId('pokemon-type-button');
    const mapButton = buttonType.map((b) => b.textContent);
    const verify = typePokemons.every((type) => mapButton.includes(type));
    expect(verify).toBeTruthy();
  });

  test('Test whether a filter button created for each type of Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const ButtonAll = getByText('All');
    const ButtonText = getByText(/Próximo pokémon/);
    fireEvent.click(ButtonAll);
    Pokemons.forEach((Pokemon) => {
      expect(getByText(Pokemon)).toBeInTheDocument();
      fireEvent.click(ButtonText);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
