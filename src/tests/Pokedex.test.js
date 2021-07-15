// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/
// https://app.betrybe.com/course/live-lectures/sd-cohort-8#aula-153-rtl-testando-react-router
// https://testing-library.com/docs/queries/about/
// https://testing-library.com/docs/queries/byalttext/

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import Pokedex from '../components/Pokedex';
import App from '../App';

test('Testa se a pág contém um heading h2 com o texto Encountered pokémons', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const checkHead = container.querySelector('h2');
  expect(checkHead.innerHTML).toBe('Encountered pokémons');
});

test('Teste se é exibido o próximo Pokémon o btn Próximo pokémon e clicado', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const checkPokemon = getByText(/Pikachu/i);
  console.log(checkPokemon.innerHTML);
  const checkBtn = getByText(/Próximo pokémon/);
  fireEvent.click(checkBtn);
  const capPokemon = getByTestId('pokemon-name');
  console.log(capPokemon.innerHTML);
  expect(checkPokemon.innerText !== capPokemon.innerHTML).toBe(true);
});

test('Teste exibido um Pokemon por vez', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const checkOne = container.querySelectorAll('.pokemon');
  console.log(checkOne.length);
  expect(checkOne.length).toBe(1);
});

test('Testa se tem botões de filtro', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const checkBtn = container.querySelectorAll('.filter-button');
  console.log(checkBtn.length);
  expect(checkBtn.length > 1).toBe(true);
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const checkBtn = getByText(/All/i);
  expect(checkBtn).toBeInTheDocument();
});
