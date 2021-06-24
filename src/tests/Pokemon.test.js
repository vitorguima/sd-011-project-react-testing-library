import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';
import { Pokemon } from '../components';

describe('Verificando o componente <Pokemon.js />', () => {
  it('Verificando se o Card é renderizado corretamente com as infos correto', () => {
    const charmander = pokemons[1];
    const { value, measurementUnit } = charmander.averageWeight;

    const { getByText, container, history } = renderWithRouter(
      <Pokemon pokemon={ charmander } showDetailsLink isFavorite />,
    );

    console.log(charmander);

    const img = container.querySelector('img');
    const pokemonLink = container.querySelector('a');

    expect(getByText(charmander.name)).toBeInTheDocument();
    expect(getByText(charmander.type)).toBeInTheDocument();
    expect(
      getByText(`Average weight: ${value} ${measurementUnit}`),
    ).toBeInTheDocument();
    expect(img.src).toBe(charmander.image);
    expect(img.alt).toBe(`${charmander.name} sprite`);
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink.href).toContain(`/pokemons/${charmander.id}`);

    fireEvent.click(getByText('More details'));

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${charmander.id}`);

    const favoriteImg = container.querySelector('.favorite-icon');

    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toContain('/star-icon.svg');
    expect(favoriteImg.alt).toBe(`${charmander.name} is marked as favorite`);
  });
});
