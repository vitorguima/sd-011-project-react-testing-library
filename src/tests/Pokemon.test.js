import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemonOverview = '.pokemon-overview';
  const moreDetails = 'More details';
  test('Verifica se card é renderizado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const type = container.querySelector(pokemonOverview).firstChild.nextSibling;
    const btnMoreDetails = getByText(moreDetails);
    fireEvent.click(btnMoreDetails);

    const name = container.querySelector(pokemonOverview).firstChild;
    const img = container.querySelector('img');
    const weigh = container.querySelector(pokemonOverview).lastChild;

    expect(name.textContent).toBe('Pikachu');
    expect(weigh.textContent).toBe('Average weight: 6.0 kg');
    expect(type.textContent).toBe('Electric');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('Verifica se o card tem link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const buttomDetails = getByText(moreDetails);

    fireEvent.click(buttomDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Verifica se o card tem link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const btnDetails = getByText(moreDetails);
    fireEvent.click(btnDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const buttomDetails = getByText(moreDetails);
    fireEvent.click(buttomDetails);

    let favoriteImage = container.querySelector('.favorite-icon');
    expect(favoriteImage).not.toBeInTheDocument();

    const inputFavorite = getByText('Pokémon favoritado?');
    fireEvent.click(inputFavorite);
    favoriteImage = container.querySelector('.favorite-icon');
    expect(favoriteImage).toBeInTheDocument();
    expect(favoriteImage.src).toContain('/star-icon.svg');
    expect(favoriteImage.alt).toBe('Pikachu is marked as favorite');
  });
});
