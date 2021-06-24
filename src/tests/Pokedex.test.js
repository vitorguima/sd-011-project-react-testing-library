import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

const pokemonsNames = Data.map(({ name }) => name);
const pokemonsTypes = Data.map(({ type }) => type);

// it('', () => {});

it('Testa se página contém um heading h2 com o texto `Encountered pokémons`', () => {
  const { container } = renderWithRouter(<App />);
  const titleH2 = container.querySelector('h2');
  expect(titleH2).toHaveTextContent(/Encountered pokémons/);
});

describe('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(/Próximo pokémon/);
    expect(buttonNext).toBeInTheDocument();
  });
  it('Testa se ao clicar, exibe pokemons diferentes até reiniciar o ciclo', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(/Próximo pokémon/);
    pokemonsNames.forEach((poke) => {
      // console.log(poke);
      expect(getByText(poke)).toBeInTheDocument();
      fireEvent.click(buttonNext);
    });
    const firstPokemon = getByText(/Pikachu/);
    expect(firstPokemon).toBeInTheDocument();
  });
});

it('Testa se é mostrado apenas um Pokémon por vez', () => {
  const { container } = renderWithRouter(<App />);
  const classPokemon = container.querySelectorAll('.pokemon');
  expect(classPokemon).toHaveLength(1);
});

// Consulta ao código do Rodolfo Rezende para compreensão da lógica https://github.com/tryber/sd-011-project-react-testing-library/pull/62/files
it('Teste se a Pokédex tem os botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttonTypes = getAllByTestId('pokemon-type-button');
  const textOfButtons = buttonTypes.map((button) => button.textContent);
  expect(pokemonsTypes.every((type) => textOfButtons.includes(type))).toBeTruthy();
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText(/All/);
  const buttonNext = getByText(/Próximo pokémon/);
  fireEvent.click(buttonAll);
  pokemonsNames.forEach((poke) => {
    // console.log(poke);
    expect(getByText(poke)).toBeInTheDocument();
    fireEvent.click(buttonNext);
  });
  const firstPokemon = getByText(/Pikachu/);
  expect(firstPokemon).toBeInTheDocument();
});

it('Testa se o botão é desabilitado quando a lista de pokemons é igual a 1', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonNext = getByText(/Próximo pokémon/);
  const buttonDragon = getByText(/Dragon/);
  fireEvent.click(buttonDragon);
  expect(buttonNext).toBeDisabled();
});
