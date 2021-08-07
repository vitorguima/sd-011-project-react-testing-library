import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

// Testa o componente <Pokedex.js />

describe('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });
});

describe('Exibi-se o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
  test('Testa se há um botão que contêm o texto Próximo pokémon', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const button = getAllByRole('button');
    expect(button[button.length - 1]).toHaveTextContent('Próximo pokémon');
  });

  test('Pokémons da lista são mostrados sucessivamente', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />);
    const button = getAllByRole('button');
    const nextButton = button[button.length - 1];
    for (let i = 0; i < button.length; i += 1) {
      const pokemonName = getByText(`${data[i].name}`);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(nextButton);
    }
  });

  test('Reseta quando chega no último Pokémon', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />);
    const button = getAllByRole('button');
    const nextButton = button[button.length - 1];
    for (let i = 0; i < button.length; i += 1) {
      fireEvent.click(nextButton);
    }
    const pikachuName = getByText('Pikachu');
    expect(pikachuName).toBeInTheDocument();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByRole, getAllByTestId } = renderWithRouter(<App />);
    const button = getAllByRole('button');
    const nextButton = button[button.length - 1];
    for (let i = 0; i < button.length; i += 1) {
      const pokemonName = getAllByTestId('pokemon-name');
      expect(pokemonName).toHaveLength(1);
      fireEvent.click(nextButton);
    }
  });
});

const stringNextPokemon = 'next-pokemon';
const strPokemonTypeButton = 'pokemon-type-button';

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test('Se for o caso, Pokédex circula somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId(stringNextPokemon);
    const pokemonTypeButton = getAllByTestId(strPokemonTypeButton);
    const pokemonType = getByTestId('pokemon-type');
    // Clico em Eletric
    fireEvent.click(pokemonTypeButton[0]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Fire
    fireEvent.click(pokemonTypeButton[1]);
    expect(pokemonType).toHaveTextContent('Fire');
    fireEvent.click(nextPokemon);
    expect(pokemonType).toHaveTextContent('Fire');
    // Clico em Bug
    fireEvent.click(pokemonTypeButton[2]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Poison
    fireEvent.click(pokemonTypeButton[3]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Psychic
    fireEvent.click(pokemonTypeButton[4]);
    expect(pokemonType).toHaveTextContent('Psychic');
    fireEvent.click(nextPokemon);
    expect(pokemonType).toHaveTextContent('Psychic');
    // Clico em Normal
    fireEvent.click(pokemonTypeButton[5]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Dragon
    fireEvent.click(pokemonTypeButton[6]);
    expect(nextPokemon.disabled).toBe(true);
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeButton = getAllByTestId(strPokemonTypeButton);
    for (let i = 0; i < pokemonTypeButton.length; i += 1) {
      expect(pokemonTypeButton[i]).toHaveTextContent(types[i]);
    }
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('Teste se existe um botão com text All;', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const allButtons = getAllByRole('button');
    expect(allButtons[0]).toHaveTextContent('All');
  });

  test('Quando o botão All for clicado não há filtros', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId(stringNextPokemon);
    const allButtons = getAllByRole('button');
    fireEvent.click(allButtons[0]);
    for (let i = 0; i < data.length; i += 1) {
      expect(nextPokemon.disabled).toBe(false);
      fireEvent.click(nextPokemon);
    }
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(<App />);
    const allButton = getAllByRole('button')[0];
    const pokemonType = getByTestId('pokemon-type');
    const nextPokemon = getByTestId(stringNextPokemon);
    fireEvent.click(allButton);
    expect(pokemonType).toHaveTextContent('Electric');
    fireEvent.click(nextPokemon);
    expect(pokemonType).toHaveTextContent('Fire');
  });
});

describe('Cria-se um botão de filtro para cada tipo de Pokémon', () => {
  test('Cria-se um botão de filtro para cada tipo de Pokémon', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getAllByTestId, getAllByRole } = renderWithRouter(<App />);
    const pokemonTypeButton = getAllByTestId(strPokemonTypeButton);
    const allButton = getAllByRole('button')[0];
    for (let i = 0; i < pokemonTypeButton.length; i += 1) {
      expect(pokemonTypeButton[i]).toHaveTextContent(types[i]);
      expect(allButton.disabled).toBe(false);
    }
  });
});

describe('Se existir um Pokémon, botão de Próximo pokémon deve ser desabilitado', () => {
  test('Se existir um Pokémon, botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId(stringNextPokemon);
    const pokemonTypeButton = getAllByTestId(strPokemonTypeButton);
    // Clico em Electric
    fireEvent.click(pokemonTypeButton[0]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Bug
    fireEvent.click(pokemonTypeButton[2]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Poison
    fireEvent.click(pokemonTypeButton[3]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Normal
    fireEvent.click(pokemonTypeButton[5]);
    expect(nextPokemon.disabled).toBe(true);
    // Clico em Dragon
    fireEvent.click(pokemonTypeButton[6]);
    expect(nextPokemon.disabled).toBe(true);
  });
});
