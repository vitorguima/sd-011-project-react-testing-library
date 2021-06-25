import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Pokemon.js component', () => {
  const pokemon = {
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
  };

  it('should render a card with the pokemon information', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByAltText('Pikachu sprite');

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should have a link to the pokemon details', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const link = screen.getByText(/More details/i);
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  it('should redirect to details page when button is clicked', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const link = screen.getByText(/More details/i);
    fireEvent.click(link);

    const detailsPage = screen.getByText(/Details/i);
    expect(detailsPage).toBeVisible();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('should render a star icon in favorite Pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeVisible();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
