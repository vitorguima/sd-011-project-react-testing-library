import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  it('testa se a página contém um h2 com texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });

  it('testa se exibe o próximo Pokémon ao clicar no botão "Próximo pokémon"', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Próximo pokémon/ });
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(button);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    const indexTypePokemons = 6;
    for (let index = 0; index < indexTypePokemons; index += 1) {
      fireEvent.click(button);
    }
    expect(pikachu).toBeInTheDocument();
  });

  it('testa se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemons = getAllByText(/Average weight/i);
    expect(pokemons.length).toEqual(1);
  });

  it('testa se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const all = getByRole('button', { name: /All/i });
    const fire = getByRole('button', { name: /Fire/i });
    const psychic = getByRole('button', { name: /Psychic/i });
    const electric = getByRole('button', { name: /Electric/i });
    const bug = getByRole('button', { name: /Bug/i });
    const poison = getByRole('button', { name: /Poison/i });
    const dragon = getByRole('button', { name: /Dragon/i });
    const normal = getByRole('button', { name: /Normal/i });
    expect(all).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
  });

  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'All' });
    const unfiltered = getByText('Pikachu');
    fireEvent.click(button);
    expect(unfiltered).toBeInTheDocument();
  });

  it('testa se é criado, dinamicamente, botão filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const allButtons = 7;
    expect(buttons.length).toBe(allButtons);
  });
});
