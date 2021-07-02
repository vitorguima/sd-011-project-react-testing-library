import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from '../renderRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritePokemon = {
  25: true,
};

const filterType = ['Electric'];

const typePokemon = ['Electric'];

describe('Teste do componente Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    // Acessar os elementos da tela
    const { getByRole } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const headingH2 = getByRole('heading', { level: 2 });
    const text = 'Encountered pokémons';
    // Fazer o teste
    expect(headingH2).toBeInTheDocument();
    expect(headingH2).toHaveTextContent(text);
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    // Acessar os elementos da tela
    const { getByText } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const button = getByText(/Próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const getPokemonName = getByText(pokemonName);
      // Interagir com a aplicação
      fireEvent.click(button);
      // Fazer o teste
      expect(getPokemonName).toBeInTheDocument();
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    // Acessar os elementos da tela
    const { getAllByTestId } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const pokemonName = getAllByTestId('pokemon-name');
    // Fazer o teste
    expect(pokemonName.length).toEqual(1);
  });

  it('Teste se a Pokédex tem os botões de filtro e pokemons do filtro', () => {
    // Acessar os elementos da tela
    const { getByText, getByRole } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    filterType.forEach((filter) => {
      const button = getByRole('button', { name: filter });
      // Interagir com a aplicação
      fireEvent.click(button);
      // Fazer o teste
      expect(button).toBeInTheDocument();
      // Acessar os elementos da tela
      pokemons.filter((pokemon) => pokemon.type === filter).forEach((poke) => {
        const pokemonName = poke.name;
        const getPokemonName = getByText(pokemonName);
        // Interagir com a aplicação
        fireEvent.click(nextButton);
        // Fazer o teste
        expect(getPokemonName).toBeInTheDocument();
      });
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // Acessar os elementos da tela
    const { getByText } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const resetButton = getByText(/all/i);
    const nextButton = getByText(/Próximo pokémon/i);
    const pikachu = getByText(/pikachu/i);
    // Interagir com a aplicação
    fireEvent.click(resetButton);
    // Fazer o teste
    expect(pikachu).toBeInTheDocument();
    expect(nextButton).toBeEnabled();
    // Acessar os elementos da tela
    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const getPokemonName = getByText(pokemonName);
      // Interagir com a aplicação
      fireEvent.click(nextButton);
      // Fazer o teste
      expect(getPokemonName).toBeInTheDocument();
    });
  });

  it('Teste se é criado dinamicamente, botão de filtro para cada tipo de Pokémon', () => {
    // Acessar os elementos da tela
    const { getByRole } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    filterType.forEach((filter) => {
      const button = getByRole('button', { name: filter });
      // Fazer o teste
      expect(button).toBeInTheDocument();
    });
  });

  // Teste se botão de Próximo deve ser desabilitado após lista filtrada tiver um só pokémon
  it('Teste se botão de Próximo deve ser desabilitado após lista filtrada tiv...', () => {
    // Acessar os elementos da tela
    const { getByText, getAllByTestId } = renderRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favoritePokemon } />,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    const buttons = getAllByTestId('pokemon-type-button');

    typePokemon.forEach((type) => {
      buttons.forEach((btn) => {
        if (btn.innerText === type) {
          fireEvent.click(btn);

          const filtered = pokemons.filter((pokemon) => pokemon.type === type);
          if (filtered.length === 1) expect(nextButton).toBeDisabled();
        }
      });
    });
  });
});
