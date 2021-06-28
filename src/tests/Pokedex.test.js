import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

describe('Tests requisito 5', () => {
  it('tests if theres a h2 heading with Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Encountered pokémons/i);

    expect(heading).toBeInTheDocument();
  });

  it('tests if clicking the Próximo Pokemon button shows the next pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const first = Data[0].name;
    const nextBtn = getByRole('button', { name: /próximo pokémon/i });
    Data.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
    if (Data.name === 'Dragonair') {
      expect(first).toBeInTheDocument();
    }
  });

  it('tests if only one pokémon is displayed at a time', () => {
    const { container } = renderWithRouter(<App />);

    Data.forEach(() => {
      const howManyOnPage = container.querySelectorAll('.pokemon');
      expect(howManyOnPage.length).toBe(1);
    });
  });

  it('tests if all filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const numTypes = 7;
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(numTypes);
  });

  it('tests if clicking a type button shows only pokemons of that type', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);

    const pokeName = getByText(/pikachu/i);
    const typeButton = getByRole('button', { name: /electric/i });
    fireEvent.click(typeButton);
    const pokeType = getByTestId('pokemon-type');

    expect(pokeName).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe(typeButton.innerHTML);
  });

  it('tests if theres an All button to show all pokemons', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', { name: /all/i });
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });

    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    Data.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemonButton);
    });
  });
});
