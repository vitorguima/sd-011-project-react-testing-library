import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };
  it('se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    );
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const image = getByAltText('Pikachu sprite');
    const imageFavorite = getByAltText('Pikachu is marked as favorite');
    const { averageWeight } = pokemon;
    const { measurementUnit, value } = averageWeight;

    expect(name).toBeInTheDocument();
    expect(name.textContent).toBe(`${pokemon.name}`);
    expect(type).toBeInTheDocument();
    expect(type.textContent).toBe(`${pokemon.type}`);

    expect(weight).toBeInTheDocument();
    expect(weight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imageFavorite.src).toContain('/star-icon.svg');
  });
  it('se contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });
});

// expect(wrapper.find(Link).props().to).toBe('/mission');

// Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
