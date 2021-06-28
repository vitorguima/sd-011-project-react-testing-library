import { fireEvent } from '@testing-library/dom';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  it('Verifica se página contém um heading h2 - texto: Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se o botão contém texto: Próximo pokémon e exibe o Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnNextPokemon = getByText(/Próximo pokémon/i);

    const firstPokemonName = getByText(/Pikachu/i);
    expect(firstPokemonName).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(btnNextPokemon);
    });
  });

  it('Verifica se é mostrado um pokemon por vez', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    pokemons.forEach(({ type }) => {
      const pokemonType = getByTestId('pokemon-type');
      expect(pokemonType.innerHTML).toBe(type);
      fireEvent.click(button);
    });
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);
    const btnPsychic = getByRole('button', { name: /Psychic/i });
    fireEvent.click(btnPsychic);
    const psychic1 = queryByText(/Alakazam/i);
    expect(psychic1).toBeInTheDocument();
    const nextPokemonPsychic = queryByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemonPsychic);
    expect(queryByText(/Alakazam/i)).not.toBeInTheDocument();
    expect(queryByText(/Mew/i)).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnFilter = getByRole('button', { name: /All/i });
    expect(btnFilter).toBeInTheDocument();
    fireEvent.click(btnFilter);
  });

  it('Verifica se o botão "proximo" foi desabilitado após lista ser filtrada', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btnNextType = getAllByTestId('pokemon-type-button');
    expect(btnNextType).toBeDefined();
  });
});
