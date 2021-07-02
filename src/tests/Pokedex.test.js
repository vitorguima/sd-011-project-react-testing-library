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
});
