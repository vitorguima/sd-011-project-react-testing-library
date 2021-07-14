import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const header = container.querySelector('h2');
  expect(header.innerHTML).toBe('Encountered pokémons');
});

test('Testa se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const firstPokemon = getByText(pokemons[0].name);
  console.log(firstPokemon.innerHTML);
  const buttonNext = getByText(/Próximo pokémon/i);
  fireEvent.click(buttonNext);
  const atualPokemon = getByTestId('pokemon-name');
  console.log(atualPokemon.innerHTML);
  expect(atualPokemon.innerText !== firstPokemon.innerHTML).toBe(true);
});

test('O botão deve conter o texto Próximo pokémon', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = container.querySelector('.pokedex-button');
  expect(button.innerHTML).toBe('Próximo pokémon');
});

test('Os Pokémons são mostrados, um a um, ao clicar sucessivamente no botão', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const previusPokemom = getByTestId('pokemon-name');
  console.log(previusPokemom.innerHTML);
  const pokeButton = getByText(/Próximo pokémon/i);
  fireEvent.click(pokeButton);
  expect(previusPokemom.innerHTML !== 'Pikachu').toBe(true);
});

test('O primeiro Pokémon é mostrado ao clicar no botão, se estiver no último', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokeButton = getByText(/Próximo pokémon/i);
  pokemons.forEach(() => fireEvent.click(pokeButton));
  const firstPokemon = getByText(pokemons[0].name);
  // console.log(firstPokemon.innerHTML);
  expect(firstPokemon).toBeInTheDocument();
});

test('Testa se é mostrado apenas um Pokémon por vez', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const totalPokemon = container.querySelectorAll('.pokemon');
  expect(totalPokemon.length === 1).toBe(true);
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const filterButtons = container.querySelectorAll('.filter-button');
  expect(filterButtons.length >= 1).toBe(true);
});

test('São exibidos apenas os Pokemons do tipo selecionado', () => {
  const { getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const filterButtons = getAllByTestId('pokemon-type-button');
  filterButtons.forEach((filter) => {
    fireEvent.click(filter);
    const typePokemon = getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe(filter.innerHTML);
  });
});

// test('O texto do botão corresponde ao nome do tipo', () => {
//   const { getAllByTestId, getByTest } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const filterButtons = getAllByTestId('pokemon-type-button');
//   filterButtons.forEach((filter) => {
//     fireEvent.click(filter);

//     const buttonName = getByTest(filter.innerText);

//     expect(buttonName).toBeInTheDocument();
//   });
// });
