// ideia tirada do codigo https://github.com/tryber/sd-011-project-react-testing-library/pull/76/files da Gisele Costa

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import Data from '../data';
import renderWithRouter from '../renderWithRouter';

const namePokemons = Data.map(({ name }) => name);
const typePokemons = Data.map(({ type }) => type);

describe('Teste o componente <Pokedex.js />', () => {
  test(
    'Teste se página contém um heading h2 com o texto '
      + 'Encountered pokémons.',
    () => {
      const { container } = renderWithRouter(<App />);
      const tagH2 = container.querySelector('h2').textContent;
      expect(tagH2).toBe('Encountered pokémons');
    },
  );

  test(
    'Teste se é exibido o próximo Pokémon da lista quando '
      + 'o botão Próximo pokémon é clicado.',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const nestPokemon = getByText('Próximo pokémon');
      namePokemons.forEach((pokemon) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(nestPokemon);
      });
    },
  );

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const nestPokemon = getByText('Próximo pokémon');
    fireEvent.click(getByText('All'));
    namePokemons.forEach((Pokemon) => {
      expect(getByText(Pokemon)).toBeInTheDocument();
      fireEvent.click(nestPokemon);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const testId = 'pokemon-type-button';
    const mapButton = getAllByTestId(testId).map((button) => button.textContent);
    expect(typePokemons.every((type) => mapButton.includes(type))).toBeTruthy();
  });
});
