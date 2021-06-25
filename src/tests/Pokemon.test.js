import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemon = {
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

describe('Verifies if the Pokemon component', () => {
  it('renders a card with the Pokémon info`', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={ pokemon } showDetailsLink={ false } isFavorite={ false } />
      </MemoryRouter>,
    );

    const PokeImg = getByRole('img');
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(getByText(/Electric/i)).toBeInTheDocument();
    expect(getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(PokeImg).toBeInTheDocument();
    expect(PokeImg.alt).toBe('Pikachu sprite');
    expect(PokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('renders a link to the Pokémon Details page`', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={ pokemon } showDetailsLink isFavorite={ false } />
      </MemoryRouter>,
    );

    const DetailsLink = getByRole('link');
    expect(DetailsLink).toBeInTheDocument();
    expect(DetailsLink).toHaveAttribute('href', '/pokemons/25');
  });
  it('changes pages when clicking on the details link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    const DetailsLink = getByText('More details');
    fireEvent.click(DetailsLink);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('renders a star image when the Pokémon is favorited`', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Pokemon pokemon={ pokemon } showDetailsLink isFavorite />
      </MemoryRouter>,
    );

    const starImg = getByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
