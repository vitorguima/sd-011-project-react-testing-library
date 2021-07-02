/* eslint-disable sonarjs/no-unused-collection */
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonsNames = pokemons.map(({ name }) => name);
const pokemonsNumbers = pokemons.length;
const nextBtnPokemon = 'next-pokemon';

describe('Teste o componente /Pokedex.js/', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
  });
  test('Teste se é exibido o Próximo pokémon da lista ao clicar no botão', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const nextBtn = getByTestId(nextBtnPokemon);

    expect(nextBtn).toHaveTextContent('Próximo pokémon');
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByTestId } = renderWithRouter(<App />);

    pokemonsNames.forEach((element) => {
      const currentPokemon = getByTestId('pokemon-name');

      expect(element).toBe(currentPokemon.textContent);
      userEvent.click(getByTestId(nextBtnPokemon));
    });
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);

    const btnByType = getAllByTestId('pokemon-type-button');

    btnByType.forEach((element) => {
      userEvent.click(element);
      for (let i = 0; i < pokemonsNumbers; i += 1) {
        expect(getByTestId('pokemon-type').textContent).toBe(element.textContent);
        userEvent.click(getByTestId(nextBtnPokemon));
      }
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    expect(getByText('All')).toBeInTheDocument();
    userEvent.click(getByText('All'));

    const pokemonInDisplay = [];

    for (let i = 0; i < pokemonsNumbers; i += 1) {
      const currentPokemon = getByTestId('pokemon-name').textContent;

      pokemonInDisplay.push(currentPokemon);

      userEvent.click(getByTestId(nextBtnPokemon));
    }
    pokemons.forEach(({ name }) => {
      const comparation = pokemonInDisplay.find((element) => element === name);
      expect(comparation).toBe(name);
    });
  });
  test('Teste se é criado, dinamicamente, um botão que filtra o tipo de Pokémon', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const typeButtonPoke = getAllByTestId('pokemon-type-button');

    typeButtonPoke.forEach((element) => {
      const currentType = pokemons.filter(({ type }) => type === element.textContent);
      if (currentType.length === 1) {
        userEvent.click(element);
        expect(getByTestId(nextBtnPokemon)).toBeDisabled();
      }
    });
  });
});
