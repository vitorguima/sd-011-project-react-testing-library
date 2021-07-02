import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

it('cotains card with all pokemons informations', () => {
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
