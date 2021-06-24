import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando funcionalidades do componente Favoritos', () => {
  it('Testa se componente <favoritePokemons /> renderiza caso não encontrados', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritesLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Testa se o componente <favoritePokemons /> renderiza favoritos', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const clickFire = getByText('Fire');
    const moreDetails = getByText(/More Details/i);
    const favoritesAll = getByText(/Favorite Pokémons/i);

    fireEvent.click(clickFire);
    fireEvent.click(moreDetails);

    const favoritePokemon = container.querySelector('#favorite');
    fireEvent.click(favoritePokemon);
    fireEvent.click(favoritesAll);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
