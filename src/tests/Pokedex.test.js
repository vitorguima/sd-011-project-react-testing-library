import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('testes componente Pokedex', () => {
  test('renderize h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('Encountered pokémons');
  });

  test('teste o botão de próximo pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const pokemonNameId = 'pokemon-name';
    const pokeName = getByTestId(pokemonNameId);
    expect(pokeName.textContent).toBe('Pikachu');
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
    const nameMap = pokemons.map(({ name }) => name);
    nameMap.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  test('teste botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeDataId = getAllByTestId('pokemon-type-button');
    const arrayDataIdType = typeDataId.map((obj) => obj.textContent);
    const typeMap = pokemons.map(({ type }) => type);
    typeMap.every((tipo) => expect(arrayDataIdType.includes(tipo)).toBeTruthy());
  });

  test('teste botão All para resetar filtro', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);
    const allBtn = getByTestId('all-button');
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');
    const nameMap = pokemons.map(({ name }) => name);
    nameMap.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    const typeDataId = getAllByTestId('pokemon-type-button');
    fireEvent.click(typeDataId[0]);
    expect(nextButton.disabled).toBeTruthy();
  });
});
