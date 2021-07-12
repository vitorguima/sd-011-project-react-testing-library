import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemon = getByText(/pikachu/i);
    const pokemonType = getByTestId('pokemon-type');
    const pokemonImage = getByRole('img');

    expect(pokemon).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('Teste se o card do Pokémon contém um link para ver detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const detailsLink = getByText('More details');

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(detailsLink);
    const pokemon = getByText('Pikachu Details');
    expect(pokemon).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um icone de estrela nos pokemons favoritos', () => {
    const { queryByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
    const star = queryByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
