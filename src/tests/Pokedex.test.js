import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testes componente Pokedex', () => {
  test('renderize h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('Encountered pokémons');
  });

  test('teste o botão de próximo pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonNameId = 'pokemon-name';
    const pokeName = getByTestId(pokemonNameId);
    expect(pokeName.textContent).toBe('Pikachu');
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Charmander');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Caterpie');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Ekans');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Alakazam');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Mew');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Rapidash');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Snorlax');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Dragonair');
    fireEvent.click(nextButton);
    expect(getByTestId(pokemonNameId).textContent).toBe('Pikachu');
  });
});
