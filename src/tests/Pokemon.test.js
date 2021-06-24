import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('testes do componente Pokemon.js', () => {
  test('teste as informações de um determinado pokemon', () => {
    const { getByTestId } = renderWithRouter(<Pokemon />);
    const nameId = getByTestId('pokemon-name');
    expect(nameId).toBeInTheDocument();
  });
});
