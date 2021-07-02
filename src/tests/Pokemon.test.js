import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste do componente Pokemon.js', () => {
  it('teste se é renderizado um card com informações do pokemon', () => {
    const { getByTestId, getByRole, history } = renderWithRouter(<App />);

    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemon-type');
    const weigthPokemon = getByTestId('pokemon-weight');
    const imagePokemon = getByRole('img');
    const linkDetails = getByRole('link', { name: /More details/ });

    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weigthPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon.alt).toBe('Pikachu sprite');

    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('teste se existe um ícone de estrela nos pokemons favoritados', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /More details/ });
    fireEvent.click(linkDetails);

    const favoriteCheck = getByRole('checkbox');
    fireEvent.click(favoriteCheck);

    const imageIcon = getAllByRole('img');
    expect(imageIcon[1].src).toContain('/star-icon.svg');
    expect(imageIcon[1].alt).toContain('Pikachu is marked as favorite');
  });
});
