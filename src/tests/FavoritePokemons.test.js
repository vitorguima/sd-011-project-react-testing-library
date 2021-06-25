import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../components';
import App from '../App';

test('testing the FavoritePokemons component', () => {
  // eslint-disable-next-line max-len

  // Renderiza <App /> clica no botão favoritos e verifica se aparece agum pokemon
  const { getAllByText, getByText, history } = renderWithRouter(<App />);
  const favoritePokNav = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokNav);
  let noFavoriteFoundMsg = getByText('No favorite pokemon found');
  expect(noFavoriteFoundMsg).toBeInTheDocument();

  // Volta para a página Home
  let homeBtn = getByText('Home');
  fireEvent.click(homeBtn);

  // Adiciona pikachu como favorito
  let moreDetailsBtn = getByText(/more details/i);
  fireEvent.click(moreDetailsBtn);
  let favoriteBtn = getByText('Pokémon favoritado?');
  fireEvent.click(favoriteBtn);
  let favoriteCheckbox = document.querySelector('#favorite');
  expect(favoriteCheckbox).toBeChecked();

  // Renderiza a home novamente
  homeBtn = getByText('Home');
  fireEvent.click(homeBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/');

  // Pula para a aba do Charmander
  const nextPokemonBtn = getByText(/Próximo pokémon/i);
  fireEvent.click(nextPokemonBtn);
  let charmander = getByText('Charmander');
  expect(charmander).toBeInTheDocument();

  // Adiciona charmander como favorito
  moreDetailsBtn = getByText(/More details/i);
  fireEvent.click(moreDetailsBtn);
  favoriteCheckbox = document.querySelector('#favorite');
  favoriteBtn = getByText('Pokémon favoritado?');
  fireEvent.click(favoriteBtn);
  expect(favoriteCheckbox).toBeChecked();

  // Verifica se Pikachu e Charmander aparecem na aba favoritos
  let favoritePokemonsBtn = getByText(/favorite pokémons/i);
  fireEvent.click(favoritePokemonsBtn);
  const pikachu = getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
  charmander = getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();

  // Remove Pikachu e Charmander do favorito
  moreDetailsBtn = getAllByText('More details');
  fireEvent.click(moreDetailsBtn[0]);
  let gameLocationsOf = getByText('Game Locations of Pikachu');
  expect(gameLocationsOf).toBeInTheDocument();

  favoritePokemonsBtn = getByText(/pokémon favoritado/i);
  fireEvent.click(favoritePokemonsBtn);
  favoriteCheckbox = document.querySelector('#favorite');
  expect(favoriteCheckbox).not.toBeChecked();

  fireEvent.click(favoritePokNav);
  moreDetailsBtn = getByText('More details');
  fireEvent.click(moreDetailsBtn);
  gameLocationsOf = getByText('Game Locations of Charmander');
  expect(gameLocationsOf).toBeInTheDocument();

  favoritePokemonsBtn = getByText(/pokémon favoritado/i);
  fireEvent.click(favoritePokemonsBtn);
  favoriteCheckbox = document.querySelector('#favorite');
  expect(favoriteCheckbox).not.toBeChecked();

  // Verifica se os pokemons não são renderizados novamente
  fireEvent.click(favoritePokNav);
  noFavoriteFoundMsg = getByText('No favorite pokemon found');
});
