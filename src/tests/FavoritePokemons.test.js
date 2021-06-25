import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('verifica se o texto é exibido quando não tiver favoritos', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);
  const noFavorites = container.querySelectorAll('.favorite-pokemons');
  expect(noFavorites.length).toBe(0);
  const parag = container.querySelector('p');
  expect(parag.innerHTML).toBe('No favorite pokemon found');
});

it('verifica se é exibido os cards dos favoritos', () => {
  const { container, getByText, getByTestId, queryByText } = renderWithRouter(<App />);
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);
  const favorite = container.querySelector('#favorite');
  fireEvent.click(favorite);
  const linkFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorite);
  const favorites = getByText('Pikachu');
  expect(favorites).toBeInTheDocument();

  const linkHome = getByText('Home');
  fireEvent.click(linkHome);
  const buttonNext = getByTestId('next-pokemon');
  fireEvent.click(buttonNext);

  fireEvent.click(getByText('More details'));
  fireEvent.click(container.querySelector('#favorite'));
  fireEvent.click(linkFavorite);

  const caterpie = queryByText('Caterpie');
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Charmander')).toBeInTheDocument();
  expect(caterpie).not.toBeInTheDocument();
});
