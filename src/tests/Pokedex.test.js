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
  expect(atualPokemon.innerText === firstPokemon.innerHTML).toBe(false);
});

test('Testa se é mostrado apenas um Pokémon por vez', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonsOnScreen = container.querySelectorAll('.pokemon');
  expect(pokemonsOnScreen.length === 1).toBe(true);
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

test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const resetButton = getByText('All');
  expect(resetButton).toBeInTheDocument();
});

test('Testa se há um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const typeButtons = getAllByTestId('pokemon-type-button');
  const maptypeButtons = typeButtons.map((item) => item.textContent);
  console.log(maptypeButtons);
  expect(maptypeButtons.includes('Fire')).toBe(true);
  expect(maptypeButtons.includes('Psychic')).toBe(true);
  expect(maptypeButtons.includes('Electric')).toBe(true);
  expect(maptypeButtons.includes('Bug')).toBe(true);
  expect(maptypeButtons.includes('Poison')).toBe(true);
  expect(maptypeButtons.includes('Dragon')).toBe(true);
  expect(maptypeButtons.includes('Normal')).toBe(true);
});

// test('O botão Próximo pokémon deve ser desabilitado quando só tiver um pokémon', () => {
//   const { getAllByTestId } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
// });
