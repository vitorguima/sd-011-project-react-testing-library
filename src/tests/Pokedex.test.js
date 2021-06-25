import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
// import App from '../App';

// describe('Teste o componente <Pokedex.js />', () => {
test('se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByText, getByRole } = render(<Pokedex />);
  const heading = getByRole(/heading/);
  const headingENcPokemons = getByText(/Encountered pokémons/);
  expect(headingENcPokemons).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
});
test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
  const { getByText, getByRole } = render(<Pokedex />);
  // vê qual é o pokemon atual
  const pikachu = getByText(/Pikachu/);
  expect(pikachu).toBeInTheDocument();
  // localiza o botão
  const linkElement = getByRole(/Próximo pokémon/);
  // clica no mesmo
  fireEvent.click(linkElement);
  // verifica se o Pikachu foi substituido pelo Charmander
  expect(pikachu).not.toBeInTheDocument();
  const charmander = getByText(/Charmander/);
  expect(charmander).toBeInTheDocument();
  // clica no mesmo
  fireEvent.click(linkElement);
  // verifica se o Pikachu foi substituido pelo Charmander
  expect(charmander).not.toBeInTheDocument();
  const caterpie = getByText(/Caterpie/);
  expect(caterpie).toBeInTheDocument();
});
// });
