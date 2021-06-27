import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pikachu = pokemons[0];

test('é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<Pokemon isFavorite pokemon={ pikachu } />);

  expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
  expect(screen.getByTestId('pokemon-type').textContent).toBe('Electric');
  expect(screen.getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
  expect(screen.getByAltText('Pikachu sprite').getAttribute('src')).toBe(pikachu.image);
});

test('contém um link de navegação para exibir detalhes deste Pokémon', () => {
  renderWithRouter(<Pokemon isFavorite pokemon={ pikachu } />);
  const linkDetalhes = screen.getByText('More details');

  expect(linkDetalhes.getAttribute('href')).toBe('/pokemons/25');
});

test('redireciona para a página de detalhes ao clicar no link', () => {
  const { history } = renderWithRouter(<Pokemon isFavorite pokemon={ pikachu } />);
  const linkDetalhes = screen.getByText('More details');

  fireEvent.click(linkDetalhes);

  expect(history.location.pathname).toBe('/pokemons/25');
});

test('existe um ícone de estrela nos Pokémons favoritados', () => {
  const { container } = renderWithRouter(<Pokemon isFavorite pokemon={ pikachu } />);
  const iconeFavorito = container.querySelector('.favorite-icon');

  expect(iconeFavorito.getAttribute('src')).toBe('/star-icon.svg');
  expect(iconeFavorito.alt).toBe('Pikachu is marked as favorite');
});
