import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon component', () => {
  const details = /more details/i;

  it('Test if the name of pokemon is correct', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe(pokemons[0].name);
  });

  it('Test if the type of pokemon is correct', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemonType = getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toBe(pokemons[0].type);
  });

  it('Test if the average weight of pokemon is correct', () => {
    const { averageWeight: { measurementUnit, value } } = pokemons[0];
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemonWeight = getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Test if the image of pokemon is correct', () => {
    const { container, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemonImage = container.querySelector('.pokemon > img');
    expect(pokemonImage.src).toBe(pokemons[0].image);
    const pokemonAlt = getByAltText(`${pokemons[0].name} sprite`);
    expect(pokemonAlt).toBeInTheDocument();
  });

  it('Test the route of more details', () => {
    let testLocation;
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );
    const moreDetails = getByText(details);
    fireEvent.click(moreDetails);
    expect(testLocation.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Test the favorite icon', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText(details);
    fireEvent.click(moreDetails);
    const favorite = container.querySelector('#favorite');
    fireEvent.click(favorite);
    const favoriteIcon = container.querySelector('.favorite-icon');
    expect(favoriteIcon.src.match(/star-icon.svg/)[0]).toBe('star-icon.svg');
    expect(favoriteIcon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
