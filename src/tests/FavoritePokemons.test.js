import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('FavoritePokemons.js component', () => {
  it('should render message if there are no favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('should show cards for all favorited pokemons', () => {
    const favoritePokemons = [
      {
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        foundAt: [{
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        }],
        id: 25,
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        name: 'Pikachu',
        summary: 'This intelligent Pokémon...',
        type: 'Electric',
      },
      {
        averageWeight: {
          value: '2.9',
          measurementUnit: 'kg',
        },
        foundAt: [{
          location: 'Johto Route 30',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Ilex Forest',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        }],
        id: 10,
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        name: 'Caterpie',
        summary: 'For protection, it releases...',
        type: 'Bug',
      },
    ];
    const { getAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const cards = getAllByText(/More details/i);
    expect(cards.length).toBe(favoritePokemons.length);
  });

  it('should show cards for all favorited pokemons', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    const moreDetailsLink = getByText(/More details/i);
    fireEvent.click(moreDetailsLink);

    let { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const markAsFavorite = screen.getByText(/Pokémon favoritado?/i);
    fireEvent.click(markAsFavorite);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const cards = screen.getAllByText(/More details/i);
    expect(cards.length).toBe(1);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeVisible();

    pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });
});
