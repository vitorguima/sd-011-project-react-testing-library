import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('', () => {
  test(`Checks if the message No favorite pokemon found is displayed on the screen,
  if the person does not have favorite pokemons.`, () => {
    renderWithRouter(<FavoritePokemons />);
    screen.getByText('No favorite pokemon found');
  });

  test('Checks if all favorite Pokemon cards are displayed.', () => {
    const { container } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const pokemonsCards = container.querySelectorAll('.pokemon');
    expect(pokemonsCards.length).toBe(pokemons.length);
  });

  test('Checks if no Pokemon card is displayed, if it is not favorited.', () => {
    const { container } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const pokemonsCards = container.querySelectorAll('.pokemon');
    expect(pokemonsCards.length).toBe(0);
  });
});
