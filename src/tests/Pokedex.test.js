import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testes do componente Pokedex', () => {
  const favoritesPokemons = {
    4: true,
    10: true,
    23: true,
    25: true,
    65: true,
    78: true,
    143: true,
    148: true,
    151: true,
  };

  const types = [
    'All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
  ];

  const NEXT_POKEMON = 'next-pokemon'; // https://rules.sonarsource.com/javascript/RSPEC-1192?search=String%20literals%20duplicated

  it('Verifica se há um heading h2 com o texto Encountered pokémons', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const title = getByText('Encountered pokémons');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const nextButton = getByTestId(NEXT_POKEMON);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.innerHTML).toBe('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      const getPokemonByName = getByText(pokemon.name);
      expect(getPokemonByName).toBeInTheDocument();
      fireEvent.click(nextButton);
    });

    fireEvent.click(nextButton);
    const nameFirstPokemon = pokemons[0].name;
    expect(nameFirstPokemon).toBe('Pikachu');
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const pokemonDiv = getAllByTestId('pokemon-name');
    const numberOfDiv = 1;
    expect(pokemonDiv.length).toBe(numberOfDiv);
  });

  it('Verifica se há botões de filtro para cada tipo de pokémon', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    types.forEach((type) => {
      const filterButton = getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
      const nextButton = getByTestId(NEXT_POKEMON);

      fireEvent.click(filterButton);
      pokemons.filter((pokemon) => pokemon.type === type).forEach((poke) => {
        const getPokemonByName = getByText(poke.name);
        expect(getPokemonByName).toBeInTheDocument();
        fireEvent.click(nextButton);
      });
    });
  });

  it('Verifica se há um botão para resetar o filtro', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const allButton = getByText(/All/i);
    const nextButton = getByTestId(NEXT_POKEMON);
    const pikachu = getByText(/pikachu/i);

    fireEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();

    pokemons.forEach((onePokemon) => {
      const getPokemonByName = getByText(onePokemon.name);
      expect(getPokemonByName).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  it('Verifica se é criado, dinamicamente, um botão para cada tipo de Pokémon ', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    types.forEach((type) => {
      const filterButton = getAllByTestId('pokemon-type-button');
      if (filterButton.innerHTML === type) {
        expect(filterButton).toBeInTheDocument();
      }
      const allButton = getByText(/All/i);
      expect(allButton).toBeInTheDocument();
    });
  });

  it('Verifica se o botão é desabilitado se só tiver um pokémon na lista', () => {
    // Cria o teste usando qual dos tipos de pokemon tem já apenas um pokemon para verificar se o botão já está desabilitado.
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const buttonPoison = getByRole('button', { name: 'Poison' });
    const nextButton = getByTestId(NEXT_POKEMON);
    fireEvent.click(buttonPoison);
    expect(nextButton).toBeDisabled(); // https://testing-library.com/docs/react-testing-library/example-intro/
  });
});
