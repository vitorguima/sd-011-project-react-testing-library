import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

const pokemonsName = Data.map(({ name }) => name);
const pokeType = Data.map(({ type }) => type);

describe('Teste o componente <Pokedex.js />', () => {
  test('Testa se existe um H2 com contéudo na tela...', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText('Encountered pokémons');

    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toBe('Encountered pokémons');
  });

  test('Testa se exibe o proximo pokemon quando clicado no botão', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');

    pokemonsName.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('Testa a existencia dos botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filteredPokemons = getAllByTestId('pokemon-type-button');
    const filteredText = filteredPokemons.map((button) => button.textContent);
    expect(pokeType.every((type) => filteredText.includes(type))).toBeTruthy(); // Se todos forem true ele retorna true e estou testando se ele vai retorna true(toBeTruthy());
  });

  test('Testa a existencia de um botão de reset', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText(/All/i);
    const nextButton = getByText(/Próximo pokémon/i);
    fireEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
    pokemonsName.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
