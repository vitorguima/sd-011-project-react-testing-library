import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

// describe('Teste o componente <FavoritePokemons.js />', () => {
test('se é exibido "No favorite pokemon found" se não tiver pokémons favoritos', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFavorite = getByText(/No favorite pokemon found/i);
  expect(noFavorite).toBeInTheDocument();
});

test('se é exibido todos os cards de pokémons favoritados', () => {
  // ir no home
  const { getByText, history, getByRole } = renderWithRouter(<App />);
  const linkElement = getByText(/Home/);
  fireEvent.click(linkElement);
  let { pathname } = history.location;
  expect(pathname).toBe('/');
  // procurar pelo link More details
  const moreDetails = getByText(/More details/);
  // clicar no mesmo
  fireEvent.click(moreDetails);
  pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');
  // procurar pelo checkbox ao lado de "Pokémon favoritado?"
  const checkBox = getByRole(/checkbox/);
  expect(checkBox.checked).toEqual(false);
  // selecioná-lo
  fireEvent.click(checkBox);
  expect(checkBox.checked).toEqual(true);
  // ir para Favorite Pokémons
  const favoritePokemon = getByText(/Favorite Pokémons/);
  fireEvent.click(favoritePokemon);
  pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
  // verificar se o nome do pokemon aparece na pagina
  const pokemon = getByText(/Pikachu/i);
  const type = getByText(/Electric/i);
  const weight = getByText(/Average weight: 6.0 kg/i);
  const more = getByText(/More details/i);
  expect(pokemon).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(weight).toBeInTheDocument();
  expect(more).toBeInTheDocument();
});

test('se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  // ir no home
  const { getByText, history, getByRole, queryByText } = renderWithRouter(<App />);
  const linkElement = getByText(/Home/);
  fireEvent.click(linkElement);
  let { pathname } = history.location;
  expect(pathname).toBe('/');
  // procurar pelo link More details
  const moreDetails = getByText(/More details/);
  // clicar no mesmo
  fireEvent.click(moreDetails);
  pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');
  // procurar pelo checkbox ao lado de "Pokémon favoritado?"
  const checkBox = getByRole(/checkbox/);
  fireEvent.click(checkBox);
  expect(checkBox.checked).toEqual(false);
  // ir para Favorite Pokémons
  const favoritePokemon = getByText(/Favorite Pokémons/);
  fireEvent.click(favoritePokemon);
  pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
  // verificar se o nome do pokemon aparece na pagina
  const pokemon = queryByText(/Pikachu/i);
  const type = queryByText(/Electric/i);
  const weight = queryByText(/Average weight: 6.0 kg/i);
  const more = queryByText(/More details/i);
  expect(pokemon).not.toBeInTheDocument();
  expect(type).not.toBeInTheDocument();
  expect(weight).not.toBeInTheDocument();
  expect(more).not.toBeInTheDocument();
});
// });
