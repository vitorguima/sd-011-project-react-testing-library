import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

it('contains card with all pokemons informations', () => {
  const { getByTestId, getByText, getByAltText } = renderWithRouter(<App />);
  data.forEach((pokemon) => {
    expect(getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
    expect(getByTestId('pokemon-type')).toHaveTextContent(pokemon.type);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(`Average weight: ${pokemon
      .averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
    expect(getByAltText(`${pokemon.name} sprite`)).toHaveAttribute('src', pokemon.image);
    fireEvent.click(getByText('Próximo pokémon'));
  });
});

it('contains link to Pokemon details', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const details = getByText('More details');
  expect(details).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(details);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/pokemons/4');
});

it('contains a star svg when pokemon is favorite', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByText('Pokémon favoritado?'));
  expect(getByAltText('Pikachu is marked as favorite'))
    .toHaveAttribute('src', '/star-icon.svg');
});
