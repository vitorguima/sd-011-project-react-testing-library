import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se é renderizado um card com as informações de determinado pokemon', () => {
  const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

  fireEvent.click(getByRole('button', { name: 'Electric' }));

  const pokemonIMG = getByRole('img');

  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
  expect(pokemonIMG.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonIMG.alt).toBe('Pikachu sprite');
  expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
});

it('Verifica se o pokemon contém um link de navegação', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  fireEvent.click(getByRole('button', { name: 'Electric' }));
  const pokemonLink = getByRole('link', { name: 'More details' });
  expect(pokemonLink).toBeInTheDocument();

  fireEvent.click(pokemonLink);
  expect(history.location.pathname).toBe('/pokemons/25');
});

it('Verifica se existe um ícone de estrela nos pokemons favoritados', () => {
  const { getByRole, getAllByRole } = renderWithRouter(<App />);

  const pokemonType = getByRole('button', { name: 'Electric' });
  expect(pokemonType).toBeInTheDocument();
  fireEvent.click(pokemonType);

  const moreDetails = getByRole('link', { name: 'More details' });
  expect(moreDetails).toBeInTheDocument();
  fireEvent.click(moreDetails);

  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  fireEvent.click(checkbox);

  const img = getAllByRole('img');

  expect(img[1].src).toContain('star-icon.svg');
  expect(img[1].alt).toContain('Pikachu is marked as favorite');
});
