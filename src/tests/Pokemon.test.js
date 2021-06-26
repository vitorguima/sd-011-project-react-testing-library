import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Tests in pokemon card', () => {
  const pokemon = {
    id: 9999,
    image: 'ImageSource',
    name: 'Pikachu',
    type: 'Eletric',
    averageWeight: {
      measurementUnit: 'kg',
      value: '10000',
    },
  };

  global.fetch = jest.fn(async () => ({
    json: async () => pokemon,
  }));

  it('Verify if render an pokemon', () => {
    const { getByTestId, getByText, getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemon-type').textContent).toBe('Eletric');
    expect(getByTestId('pokemon-weight').textContent)
      .toBe('Average weight: 10000 kg');
    const imageSource = getAllByRole('img');
    // test Pokemon image
    expect(imageSource[0].alt).toBe('Pikachu sprite');
    expect(imageSource[0].src).toBe('http://localhost/ImageSource');
    // test isfavorite image
    expect(imageSource[1].src).toBe('http://localhost/star-icon.svg');
    expect(imageSource[1].alt).toBe('Pikachu is marked as favorite');
    // console.log(imageSource[1].alt)
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toBe('http://localhost/pokemons/9999');
  });
});
