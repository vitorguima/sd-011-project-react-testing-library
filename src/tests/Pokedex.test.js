import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const nextPokemonButton = 'Próximo pokémon';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);
    const encountredPokemon = getByText('Encountered pokémons');
    expect(encountredPokemon.tagName).toBe('H2');
    expect(encountredPokemon.textContent).toBe('Encountered pokémons');
  });

  it('Verifica se ao clickar no prox button um novo pokemon aparece', () => {
    const { getByText } = renderWithRouter(<App />);
    const NextPokemon = getByText(nextPokemonButton);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(NextPokemon);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    pokemons.filter(({ name }) => name !== 'Pikachu').forEach((pokemon) => {
      expect(screen.queryByText(pokemon.name)).toBeNull();
    });
    const NextPokemon = getByText(nextPokemonButton);
    fireEvent.click(NextPokemon);
    expect(getByText('Charmander')).toBeInTheDocument();
    pokemons.filter(({ name }) => name !== 'Charmander').forEach((pokemon) => {
      expect(screen.queryByText(pokemon.name)).toBeNull();
    });
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const typeFilter = [...new Set(pokemons.map(({ type }) => type)), 'All'];
    const allButtons = getAllByTestId('pokemon-type-button');
    const allButtonsText = allButtons.map((element) => element.textContent);
    expect(allButtonsText.every((type) => typeFilter.includes(type))).toBeTruthy();
    fireEvent.click(allButtons[1]);
    const NextPokemon = getByText(nextPokemonButton);
    const pokemonTypesNames = pokemons.filter(({ type }) => type === allButtons[1])
      .map(({ name }) => name);
    pokemonTypesNames.forEach((pokeName) => {
      expect(pokeName).toBeInTheDocument();
      fireEvent.click(NextPokemon);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText('All');
    expect(allButton.textContent).toBe('All');
    fireEvent.click(allButton);
    const NextPokemon = getByText(nextPokemonButton);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(NextPokemon);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  // Não sei verificar como faz dinâmico :(

  it('O botão de Próximo pokémon deve ser desabilitado quando só tem 1 pokemon.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const allButtons = getAllByTestId('pokemon-type-button');
    fireEvent.click(allButtons[0]);
    const NextPokemon = getByText(nextPokemonButton);
    expect(NextPokemon.disabled).toBeTruthy();
    fireEvent.click(allButtons[2]);
    expect(NextPokemon.disabled).toBeTruthy();
    fireEvent.click(allButtons[1]);
    expect(NextPokemon.disabled).toBeFalsy();
  });
});
