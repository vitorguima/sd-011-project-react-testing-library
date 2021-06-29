import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o Pokedex.js', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonPokemon = getByRole('button', { name: /Próximo pokémon/ });
    expect(buttonPokemon).toBeInTheDocument();
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const caterpie = getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const ekans = getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const alakazam = getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const mew = getByText(/mew/i);
    expect(mew).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const rapidash = getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const snorlax = getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    const dragonair = getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();
    fireEvent.click(buttonPokemon);
    expect(pikachu).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemonCard = getAllByText(/Average weight/i);
    expect(pokemonCard.length).toBe(1);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: /All/ });
    expect(buttonAll).toBeInTheDocument();
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const weight = getByText(/6/i);
    expect(weight).toBeInTheDocument();
  });

  test('Testa se é criadomum botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const all = getByRole('button', { name: /All/ });
    const fire = getByRole('button', { name: /Fire/ });
    const bug = getByRole('button', { name: /Bug/ });
    const poison = getByRole('button', { name: /Poison/ });
    const psychic = getByRole('button', { name: /Psychic/ });
    const normal = getByRole('button', { name: /Normal/ });
    const dragon = getByRole('button', { name: /Dragon/ });

    expect(all).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    const buttons = getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;
    expect(buttons.length).toEqual(numberOfButtons);
  });
});
