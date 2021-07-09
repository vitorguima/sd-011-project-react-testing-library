import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const moreDetailsLinkName = 'More details';

const mockedPokemon = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: { value: '48.0', measurementUnit: 'kg' },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
};

const getNumbersFromString = (string) => string.match(/[\d+]/g).join('');

describe('Pokemon component tests', () => {
  it('should render the correct pokemon info', () => {
    render(
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

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  it('should display a pokemon details link', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />
      </MemoryRouter>,
    );

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
    expect(detailsLink.href).toContain(`/pokemons/${mockedPokemon.id}`);
  });

  it('should redirect to the details page on more details link click', () => {
    const { history } = renderWithRouter(<App />);

    let detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
    fireEvent.click(detailsLink);
    let { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${getNumbersFromString(detailsLink.href)}`);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    fireEvent.click(screen.getByRole('button', { name: 'Normal' }));
    detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
    fireEvent.click(detailsLink);
    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${getNumbersFromString(detailsLink.href)}`);
  });

  it('should redirect to the correct details page on more details link click', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ mockedPokemon } isFavorite={ false } />,
    );

    fireEvent.click(screen.getByRole('link', { name: moreDetailsLinkName }));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockedPokemon.id}`);
  });

  it('should display an icon if pokemon is favorite', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ mockedPokemon } isFavorite />
      </MemoryRouter>,
    );

    const favoritedImage = screen
      .getByAltText(`${mockedPokemon.name} is marked as favorite`);
    expect(favoritedImage.src).toMatch('/star-icon.svg');
  });
});
