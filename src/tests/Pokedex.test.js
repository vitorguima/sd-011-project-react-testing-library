import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente "Pokedex.js"', () => {
  const typeTestId = 'pokemon-type';
  test('Teste se página contém um heading h2 com o texto'
   + '"Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista'
  + 'quando o botão "Próximo pokémon" é clicado', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const lastPokemon = 8;

    for (let index = 0; index < lastPokemon; index += 1) {
      userEvent.click(btnNextPokemon);
    }
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const onlyPokemonRender = getAllByTestId('pokemon-name');
    expect(onlyPokemonRender.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const btnTypePokemon = getByRole('button', {
      name: /Electric/i,
    });

    const typePokemonRender = getByTestId(typeTestId);

    userEvent.click(btnTypePokemon);
    expect(typePokemonRender.innerHTML).toEqual('Electric');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const btnAll = getByRole('button', {
      name: /All/i,
    });
    expect(btnAll).toBeInTheDocument();

    const btnTypePokemon = getByRole('button', {
      name: /Bug/i,
    });

    userEvent.click(btnTypePokemon);

    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(btnNextPokemon);
    let typePokemonRender = getByTestId(typeTestId);
    expect(typePokemonRender.innerHTML).toEqual('Bug');

    userEvent.click(btnAll);
    userEvent.click(btnNextPokemon);
    typePokemonRender = getByTestId('pokemon-name');
    expect(typePokemonRender.innerHTML).toEqual('Charmander');
  });

  test('Teste se é criado, dinamicamente,'
  + 'um botão de filtro para cada tipo de Pokémon.', () => {
    const { getByRole, getByTestId, getAllByTestId } = renderWithRouter(<App />);

    const pokemonQuantity = 9;
    const typeQuantaty = 7;

    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    for (let index = 0; index < pokemonQuantity; index += 1) {
      const typePokemon = getByTestId(typeTestId);
      const typePokemomBtn = getByRole('button', {
        name: typePokemon.innerHTML,
      });
      expect(typePokemomBtn).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }
    const pokemonTypeBtns = getAllByTestId('pokemon-type-button');
    expect(pokemonTypeBtns.length).toBe(typeQuantaty);
  });
});

