import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de um pokémon.', () => {
    const { history,
      getByText,
      getByTestId,
      getAllByRole,
    } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const pikachu = getByTestId('pokemon-name');
    expect(pikachu.innerHTML).toBe('Pikachu');
    const eletric = getByTestId('pokemon-type');
    expect(eletric.innerHTML).toBe('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    const img = getAllByRole('img');
    expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img[0].alt).toBe('Pikachu sprite');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history,
      getByText,
      getByRole,
      getAllByRole,
    } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByRole('checkbox');
    fireEvent.click(favorite);
    const img = getAllByRole('img');
    expect(img[1].src).toBe('http://localhost/star-icon.svg');
    expect(img[1].alt).toBe('Pikachu is marked as favorite');
  });
});
