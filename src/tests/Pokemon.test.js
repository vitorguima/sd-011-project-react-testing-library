import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../App';
import pokemons from '../data';

describe('test the Pokemon component', () => {
  it('tests if render a pokemon card with the info about this pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
    expect(getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(getByRole('img').alt).toBe(`${pokemons[0].name} sprite`);
  });

  // eslint-disable-next-line max-len
  it('tests if the card rendered has a link to show details about the pokemon and when clicked, render the correct component ', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const moreDetailsBtn = getByText('More details');
    expect(moreDetailsBtn).toBeInTheDocument();
    fireEvent.mouseOver(moreDetailsBtn);
    expect(moreDetailsBtn.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(moreDetailsBtn);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('tests if a favorite pokemon renders with a star', () => {
    const { getAllByRole, getByText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);

    const moreDetailsBtn = getByText(/More details/);
    fireEvent.click(moreDetailsBtn);

    const pokemonFavoritado = getByText(/Pokémon favoritado/);
    fireEvent.click(pokemonFavoritado);

    const homeBtn = getByText('Home');
    fireEvent.click(homeBtn);

    const imgs = getAllByRole('img');

    expect(imgs[1].src).toBe('http://localhost/star-icon.svg');
    expect(imgs[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
