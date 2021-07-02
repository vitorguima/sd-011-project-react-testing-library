import React from 'react';
import { fireEvent } from '@testing-library/dom';
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
};

const MORE_DETAILS = 'More details';

describe('Testes do componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );

    const name = getByTestId('pokemon-name').innerHTML;
    expect(name).toBe('Pikachu');
    expect(name).toBe(pokemon.name);

    const type = getByTestId('pokemon-type').innerHTML;
    expect(type).toBe('Electric');
    expect(type).toBe(pokemon.type);

    const weight = getByTestId('pokemon-weight').innerHTML;
    const averageWeightValue = pokemon.averageWeight.value;
    const { measurementUnit } = pokemon.averageWeight;
    expect(weight).toBe(`Average weight: ${averageWeightValue} ${measurementUnit}`);

    const image = getAllByRole('img')[0];
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(pokemon.image);
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe(`${pokemon.name} sprite`);
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('Verifica se o card do Pokémon contém um link para exibir detalhes', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const linkDetails = getByText(MORE_DETAILS);
    expect(linkDetails.href).toContain(`pokemons/${pokemon.id}`);
  });

  it('Verifica se ao clicar no link vai para a página de detalhes de Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkMoreDetails = getByText(MORE_DETAILS);
    fireEvent.click(linkMoreDetails);
    const PikachuDetails = getByText('Pikachu Details');
    expect(PikachuDetails).toBeInTheDocument();
  });

  it('Verifica se a URL contém o id do Pokémon cujos detalhes se deseja ver', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const getMoreDetails = getByText(MORE_DETAILS);
    fireEvent.click(getMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const images = getAllByRole('img')[1];
    expect(images.src).toContain('/star-icon.svg');
    expect(images.alt).toBe(`${pokemon.name} is marked as favorite`);
    expect(images.alt).toBe('Pikachu is marked as favorite');
  });
});
