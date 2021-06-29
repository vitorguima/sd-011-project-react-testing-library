import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Test the Pokemon Component', () => {
  const pikachu = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
  };

  it('Test if a card with pokemons information is rendered', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    expect(getByRole('link', { name: /More details/ })).toBeInTheDocument();
  });

  it('The correct Pokémon name must be shown in the screen', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
  });

  it('The correct Pokémon type must be shown in the screen', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );
    expect(getByTestId('pokemon-type').textContent).toBe('Electric');
  });

  it('The correct Pokémon weight must be shown in the screen', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
  });

  it('The pokemon img must be shown', () => {
    const { getByRole, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );
    expect(getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  it('Test if the Pokemon card contains a Link', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );
    const pikachuDetailsLink = getByRole('link', { name: /More details/ });
    expect(pikachuDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Test if clicking on Details Link, leads to the pokemons details page', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
      />,
    );
    fireEvent.click(getByRole('link', { name: /More details/ }));
    const pikachuURL = history.location.pathname;
    expect(pikachuURL).toBe('/pokemons/25');
  });

  it('Test if exists a star icon on favorited Pokemons', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ pikachu.id }
      />,
    );
    const starImage = getByAltText('Pikachu is marked as favorite');
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Image must have the attribute "alt" equal as Pikachu is marked as favorite', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ pikachu.id }
      />,
    );
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
