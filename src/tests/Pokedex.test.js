import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex', () => {
  test('Contem um h2 com texto especifico', () => {
    const { getByText } = renderWithRouter(<App />);
    const myH2 = getByText('Encountered pokémons');
    expect(myH2).toBeInTheDocument();
  });

  test('Exibe outro pokemon ao proximo pokemon ser clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    const botaoProximo = getByText('Próximo pokémon');
    userEvent.click(botaoProximo);
    const verificaProximo = getByText('Charmander');
    expect(verificaProximo).toBeInTheDocument();
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    const verificaVoltaPrimeiro = getByText('Pikachu');
    expect(verificaVoltaPrimeiro).toBeInTheDocument();
  });

  test('Mostra somente 1 pokemon por vez', () => {
    const { getByText } = renderWithRouter(<App />);
    let pokemons = document.querySelectorAll('.pokemon');
    expect(pokemons.length).toBe(1);
    const botaoProximo = getByText('Próximo pokémon');
    userEvent.click(botaoProximo);
    pokemons = document.querySelectorAll('.pokemon');
    expect(pokemons.length).toBe(1);
  });

  test('Tem os botoes de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const botoes = getAllByTestId('pokemon-type-button');
    const totalCategories = 7;
    expect(botoes.length).toBe(totalCategories);
    expect(botoes[0]).toHaveTextContent('Electric');
    expect(botoes[1]).toHaveTextContent('Fire');
    expect(botoes[2]).toHaveTextContent('Bug');
    expect(botoes[3]).toHaveTextContent('Poison');
    expect(botoes[4]).toHaveTextContent('Psychic');
    expect(botoes[5]).toHaveTextContent('Normal');
    expect(botoes[6]).toHaveTextContent('Dragon');
  });

  test('Tem botao para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const botoes = document.querySelectorAll('.filter-button');
    expect(botoes[0]).toHaveTextContent('All');
    const botaoProximo = getByText(/róximo pokémon/);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    const verificaVoltaPrimeiro = getByText('Pikachu');
    expect(verificaVoltaPrimeiro).toBeInTheDocument();
    userEvent.click(botoes[1]);
    userEvent.click(botoes[0]);
    userEvent.click(botaoProximo);
    const charmanderPoke = getByText('Charmander');
    expect(charmanderPoke).toBeInTheDocument();
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    userEvent.click(botaoProximo);
    expect(verificaVoltaPrimeiro).toBeInTheDocument();
  });

  test('Botao proximo desabilita quando so tiver 1', () => {
    const { getByText } = renderWithRouter(<App />); // ATENÇÃO
    const botoes = document.querySelectorAll('.filter-button');
    expect(botoes[1]).toHaveTextContent('Electric');
    userEvent.click(botoes[1]);
    const botaoProximo = getByText(/róximo pokémon/);
    userEvent.click(botaoProximo);
    const verificaVoltaPrimeiro = getByText('Pikachu');
    expect(verificaVoltaPrimeiro).toBeInTheDocument();
  });
});
