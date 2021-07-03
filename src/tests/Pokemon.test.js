import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 06 Pokemon', () => {
  it('Deve renderizar um card com informações do pokemon', () => {
    const { getByTestId, getByRole, history } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeight = getByTestId('pokemon-weight');
    const pokeImage = getByRole('img');
    const linkDetails = getByRole('link', { name: /More details/ });

    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImage.alt).toBe('Pikachu sprite');

    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
