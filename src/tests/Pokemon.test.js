import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouters from '../renderWithRouter';
import App from '../App';

describe('Testes do componente Pokemon.js', () => {
  test('Renderiza um card com informações do pokemon', () => {
    const { getByTestId } = renderWithRouters(<App />);
    const myPokeDiv = document.querySelectorAll('.pokemon');
    expect(myPokeDiv.length).toBe(1);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = document.querySelectorAll('img');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('6.0 kg');
    expect(pokemonImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage[0].alt).toBe('Pikachu sprite');
  });

  test('Contem link para detalhes e verifica o link', () => {
    const { getByText, history } = renderWithRouters(<App />);
    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouters(<App />);
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    const favoriteCheckbox = getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const favoriteImage = document.querySelector('.favorite-icon');
    expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteImage.alt).toBe('Pikachu is marked as favorite');
  });
});
