import { fireEvent } from '@testing-library/dom';
import React from 'react';
import Pokedex from '../components/Pokedex';
import Data from '../data';
import renderWithRouter from '../renderWithRouter';

const nextPoke = 'next-pokemon';

describe('Teste o componente <Pokedex.js />', () => {
  const pokemonsArr = Data;
  const isFavorite = {
    4: true,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: true,
    148: false,
    151: false,
  };
  test('Teste se página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemonsArr }
      isPokemonFavoriteById={ isFavorite }
    />);
    const head = getByRole('heading');
    expect(head).toBeInTheDocument();
    expect(head.textContent).toBe('Encountered pokémons');
  });
  test('Testa o botão', () => {
    const pokemonsArray = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu'];
    const { getByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemonsArr }
      isPokemonFavoriteById={ isFavorite }
    />);
    const btn = getByTestId(nextPoke);
    expect(btn).toBeInTheDocument();
    expect(btn.textContent).toMatch(/Próximo pokémon/i);
    pokemonsArray.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(btn);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemonsArr }
      isPokemonFavoriteById={ isFavorite }
    />);
    const Pokemon = getByTestId('pokemon-name');
    expect(Pokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const fireArr = ['Charmander', 'Rapidash'];
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemonsArr }
      isPokemonFavoriteById={ isFavorite }
    />);
    const btnType = getAllByTestId('pokemon-type-button');
    // Clicando no botão Fire seleciona os pokemons de fogo
    const fireBtn = btnType.find((button) => button.textContent === 'Fire');
    fireEvent.click(fireBtn);
    expect(getByText(fireArr[0])).toBeInTheDocument();
    const btn = getByTestId(nextPoke);
    fireEvent.click(btn);
    expect(getByText(fireArr[1])).toBeInTheDocument();
    // Testa se ao clicar em All ele seleciona todos os pokemons
    const allBtn = getByText('All');
    fireEvent.click(allBtn);
    const nextBtn = getByTestId(nextPoke);
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.textContent).toMatch(/Próximo pokémon/i);
    Data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(btn);
    });
  });
});
