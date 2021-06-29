import React from 'react';
import { fireEvent, getAllByRole } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritePokemon = {
  25: true,
  4: true,
  10: true,
  23: true,
  65: true,
  151: false,
  78: false,
  143: false,
  148: false,
};

const filters = [
  'All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
];

const types = [
  'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
];

describe('Testando o componente Pokedex', () => {
  it('Verifica se contém um "h2" com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const heading = getByRole('heading', { level: 2 });
    const titleText = 'Encountered pokémons';

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
  });

  it('Verifica se exibe o próximo Pokémon quando aperta no botão', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const btn = getByText(/Próximo pokémon/i);

    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const getPokemonName = getByText(pokemonName);
      expect(getPokemonName).toBeInTheDocument();
      fireEvent.click(btn);
    });

    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Verifica se é mostrado um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const pokemonName = getAllByTestId('pokemon-name');

    expect(pokemonName.length).toEqual(1);
  });

  it('Verifica se tem os botões de filtro e os pokémons de cada tipo', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const nextBtn = getByText(/Próximo pokémon/i);

    filters.forEach((filter) => {
      const btn = getByRole('button', { name: filter });
      expect(btn).toBeInTheDocument();

      fireEvent.click(btn);
      pokemons.filter((pokemon) => pokemon.type === filter).forEach((poke) => {
        const pokemonName = poke.name;
        const getPokemonName = getByText(pokemonName);
        expect(getPokemonName).toBeInTheDocument();
        fireEvent.click(nextBtn);
      });
    });
  });

  it('Verifica se possui um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const allBtn = getByText(/all/i);
    const nextBtn = getByText(/Próximo pokémon/i);
    const pikachu = getByText(/pikachu/i);

    fireEvent.click(allBtn);
    expect(pikachu).toBeInTheDocument();
    expect(nextBtn).toBeEnabled();

    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const getPokemonName = getByText(pokemonName);
      expect(getPokemonName).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });

    expect(allBtn).toBeInTheDocument();
  });

  it('Verifica se é criado, dinamicamente, um botão de filtro para cada tipo', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );

    filters.forEach((filter) => {
      const btn = getByRole('button', { name: filter });
      expect(btn).toBeInTheDocument();
    });
  });

  // O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.
  it('Verifica se o botão "Próximo" é desabilitado se tiver só um pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const nextBtn = getByText(/Próximo pokémon/i);
    const buttons = getAllByTestId('pokemon-type-button');

    types.forEach((type) => {
      buttons.forEach((btn) => {
        if (btn.innerText === type) {
          fireEvent.click(btn);

          const filtered = pokemons.filter((pokemon) => pokemon.type === type);
          if (filtered.length === 1) expect(nextBtn).toBeDisabled();
        }
      });
    });
  });
});
