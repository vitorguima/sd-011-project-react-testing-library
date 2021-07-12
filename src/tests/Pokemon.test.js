import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const mockedPokemon = {
  id: 143,
  name: 'Snorlax',
  type: 'Normal',
  averageWeight: {
    value: '460.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
};

const moreDetails = 'More details';

describe('Pokemon tests', () => {
  it('should render pokemon info', () => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />
      </MemoryRouter>,
    );

    const {
      name,
      type,
      averageWeight: { value, measurementUnit },
      image,
    } = mockedPokemon;

    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = getByRole('img');
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  it('should display a pokemon details link', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />
      </MemoryRouter>,
    );

    const detailsLink = getByRole('link', { name: moreDetails });
    expect(detailsLink.href).toContain(`/pokemons/${mockedPokemon.id}`);
  });

  it('should redirect to "More details" page', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Normal'));
    fireEvent.click(getByRole('link', { name: moreDetails }));
    expect(getByText(`${mockedPokemon.name} Details`)).toBeInTheDocument();
  });

  it('should change URL to pokemon details path', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />,
    );

    const detailsLink = getByRole('link', { name: moreDetails });
    fireEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${mockedPokemon.id}`);
  });

  it('should render favorite star icon in favorite pokémons details page', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Pokemon pokemon={ mockedPokemon } isFavorite />
      </MemoryRouter>,
    );

    const favoriteIcon = getByAltText(`${mockedPokemon.name} is marked as favorite`);
    expect(favoriteIcon.src).toMatch('/star-icon.svg');
  });
});
