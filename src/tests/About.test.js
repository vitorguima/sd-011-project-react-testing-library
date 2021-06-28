import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('show infos about pokedex', () => {
  const { getByTestId } = render(<About />);
  expect(getByTestId('pokedex-infos')).toBeInTheDocument();
});
