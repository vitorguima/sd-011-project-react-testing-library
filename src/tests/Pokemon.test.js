import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Requisito 6 - Teste o componente <Pokemon/>', () => {
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
  it('Testa se as informações de determinado pokémon são renderizadas', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ false }
      />,
    );
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/Pikachu/);
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/Electric/);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const image = getByAltText(/Pikachu sprite/);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card contém um link para mais detalhes', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ false }
      />,
    );
    const link = getByRole('link');
    expect(link.href).toContain('/pokemons/25');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos favoritos', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star.src).toContain('/star-icon.svg');
  });
});
