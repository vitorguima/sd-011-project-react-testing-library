import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

let getByTestId;
let container;
let history;

beforeEach(() => {
  ({ getByTestId, container, history } = renderWithRouter(<App />));
});

describe('Teste se é renderiza um card com as informações de um pokémon.', () => {
  it('Nome correto do pokémon', () => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('Tipo correto do pokémon', () => {
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });

  it('Peso correto do pokémon', () => {
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Imagem correta do pokémon', () => {
    const pokemonImg = container.querySelector('img[alt]');
    expect(pokemonImg).toContainHTML('<img src="https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png" alt="Pikachu sprite">');
  });

  it('Link de descrições correta do pokémon', () => {
    const pokemonLink = container.querySelector('a[href="/pokemons/25"]');
    expect(pokemonLink).toHaveTextContent('More details');
  });
});

describe('Teste se os links do card estão funcionando', () => {
  it('Clicar no link vai para a página de descrições', () => {
    const pokemonLink = container.querySelector('*[href="/pokemons/25"]');
    userEvent.click(pokemonLink);

    const pokemonFavorite = container.querySelector('.favorite-form');
    expect(pokemonFavorite).toBeInTheDocument();
  });

  it('Url atual muda com "pokemon:id"', () => {
    const pokemonLink = container.querySelector('a[href="/pokemons/25"]');
    userEvent.click(pokemonLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Ícone de favoritos', () => {
    const pokemonLink = container.querySelector('*[href="/pokemons/25"]');
    userEvent.click(pokemonLink);

    const pokemonIcon = container.querySelector('img[src="/star-icon.svg"]');
    const pokemonFav = container.querySelector('input#favorite');

    if (pokemonFav.checked) {
      expect(pokemonFav).toBeChecked();
      expect(pokemonIcon.alt).toBe('Pikachu is marked as favorite');
    } else {
      expect(pokemonFav).not.toBeChecked();
      expect(pokemonIcon).not.toBeInTheDocument();
    }
  });
});
