import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('show page note found', () => {
  const { getByRole } = render(<NotFound />);
  const text = getByRole('heading', { name: /Page requested not found Crying emoji/i });
  expect(text).toBeInTheDocument();
});

test('show image', () => {
  const { getByAltText } = render(<NotFound />);
  expect(getByAltText('Pikachu crying because the page requested was not found').src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
