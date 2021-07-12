import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    const headingText = getByText(/Encountered pokémons/);
    expect(headingText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNextPokemon = getByTestId('next-pokemon');
    expect(buttonNextPokemon).toBeInTheDocument();
    expect(buttonNextPokemon).toHaveTextContent(/Próximo pokémon/);
    pokemons.forEach((item) => {
      const pokemon = getByTestId('pokemon-name');
      expect(item.name).toEqual(pokemon.innerHTML);
      fireEvent.click(buttonNextPokemon);
    });
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonListLenght = getAllByTestId('pokemon-name').length;
    expect(pokemonListLenght).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filters = getAllByTestId('pokemon-type-button').length;
    const filterquantity = 7;
    expect(filters).toBe(filterquantity);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText('All');
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
    const pokemonShown = getByText(/Pikachu/);
    expect(pokemonShown).toBeInTheDocument();
  });

  it('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const filterButtonPsychic = getByText('Psychic');
    const filterButtonFire = getByText('Fire');
    fireEvent.click(filterButtonPsychic);
    const pokemonPsychic = getByTestId('pokemon-type');
    expect(pokemonPsychic).toHaveTextContent('Psychic');
    fireEvent.click(filterButtonFire);
    const pokemonFire = getByTestId('pokemon-type');
    expect(pokemonFire).toHaveTextContent('Fire');
  });
});
