import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritePokemons = {
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

const options = [
  'All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
];

const types = [
  'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
];

describe('Teste o componente <Pokedex.js />', () => {
  it('Se página contém um heading h2 com o texto Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );
    const heading = getByRole('heading', { level: 2 });
    const titleText = 'Encountered pokémons';

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(titleText);
  });

  it('Se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
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

  it('Se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );
    const pokemonName = getAllByTestId('pokemon-name');

    expect(pokemonName.length).toEqual(1);
  });

  it('Se a Pokédex tem os botões de filtro', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );
    const nextBtn = getByText(/Próximo pokémon/i);

    options.forEach((filter) => {
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

  it('Se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
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

  it('Se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
    );

    options.forEach((filter) => {
      const btn = getByRole('button', { name: filter });
      expect(btn).toBeInTheDocument();
    });
  });

  it('Se o botão de Próximo é desabilitado quando a lista tiver um só pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemons } />,
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
