import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';

describe('Teste componente <Pokedex.js />', () => {
  it('Contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();

    const arrayPokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    arrayPokemons.forEach((pokemon) => {
      fireEvent.click(btnNext);
      const currentPokemon = getByTestId(pokemonName);
      expect(currentPokemon.innerHTML).toBe(pokemon);
    });
  });

  it('Pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    const btnFire = getByRole('button', { name: 'Fire' });
    expect(btnFire).toBeInTheDocument();

    fireEvent.click(btnFire);
    const firePokemons = ['Rapidash', 'Charmander'];

    firePokemons.forEach((pokemon) => {
      fireEvent.click(btnNext);
      const firePokemon = getByTestId(pokemonName);
      expect(firePokemon.innerHTML).toBe(pokemon);
    });
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnPsychic = getByRole('button', { name: 'Psychic' });
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnPsychic);
    const alakazam = getByTestId(pokemonName);
    expect(alakazam.innerHTML).toBe('Alakazam');

    fireEvent.click(btnAll);
    const pikachu = getByTestId(pokemonName);
    expect(pikachu.innerHTML).toBe('Pikachu');
  });
});
