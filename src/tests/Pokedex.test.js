import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import Pokedex from '../components/Pokedex';
// import pokemons from '../data';

describe('Testes do requisito 05: ', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextPokemonBtn = getByRole('button', { name: /Próximo pokémon/ });
    expect(nextPokemonBtn).toBeInTheDocument();

    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Charmander/)).toBeInTheDocument();
    /* Como a lista de pokemons pelo data.js tem 9 pokemons,
  logo, daqui a alguns cliques o Pikachu aparecerá novamente.
  Sendo o array de pokemons: [Pikachu, Charmander, Caterpie, Ekans, Alakazam, Mew, Rapidash, Smnorlax, Dragonair];
  */

    const missingPokemons = 8; // Tirando charmander faltam 8 pokemons para aparecer o primeiro da lista (pikachu).
    for (let index = 0; index < missingPokemons; index += 1) {
      fireEvent.click(nextPokemonBtn);
    }
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByText } = renderWithRouter(<App />);
    expect(getAllByText(/Average weight/i).length).toEqual(1);
    // Cada pokemon aparece com seu Average Wheigth. Sendo apenas UM por pokemon.
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: /Psychic/ }));
    expect(getByText(/Alakazam/)).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: /Próximo pokémon/ }));
    expect(getByText(/Mew/)).toBeInTheDocument();
    // Ao clicar no tipo Psychic, aparecem somente 2 pokemons filtrados.
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const resetPokemons = getByRole('button', { name: /All/i });
    fireEvent.click(resetPokemons);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    // Sempre que clicar no botão All, aparecerá o Pikachu, o primeiro do array pokemons.
  });

  test('Se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const ButtonsWithID = 7;
    expect(getAllByTestId(/pokemon-type-button/i).length).toBe(ButtonsWithID);

    /* Verifica se todos os botões com filtros se encontram na tela, verificando o id.
     Somente o botão All nao possui esse id, logo espera-se 7 na tela. */
  });
});
