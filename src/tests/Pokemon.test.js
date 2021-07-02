import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6 - Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonAverage = getByText(/Average weight/);
    expect(pokemonAverage).toBeInTheDocument();

    const pokemonImg = getByRole('img', { name: /sprite/ });
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('link para exibir detalhes do Pokémon e redirecionar.', () => {
    const { getByRole, history, getByTestId } = renderWithRouter(<App />);

    const pokemonLinkDetails = getByRole('link', { name: /More details/ });
    expect(pokemonLinkDetails).toBeInTheDocument();
    expect(pokemonLinkDetails).toHaveAttribute('href', '/pokemons/25');

    fireEvent.click(pokemonLinkDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const pokemonName = getByTestId('pokemon-name');
    const pokemonFavorite = getByRole('checkbox', { name: /Pokémon favoritado?/ });
    fireEvent.click(pokemonFavorite);

    const star = getByRole('img', { name: /Pikachu is marked as favorite/ });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${pokemonName.innerHTML} is marked as favorite`);
  });
});
