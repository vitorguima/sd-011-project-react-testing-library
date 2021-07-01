import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('the `h2` with text `Page requested not found 😭`', () => {
  const { getByText } = render(<NotFound />);
  const heading = getByText(/Page requested not found/);

  expect(heading).toBeInTheDocument();
});

test('gif with correct URL', () => {
  const { getByAltText } = render(<NotFound />);
  const gif = getByAltText('Pikachu crying because the page requested was not found');

  expect(gif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
