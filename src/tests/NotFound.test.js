import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('page contains a heading h2 with the text Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const heading = getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });
  expect(heading).toBeInTheDocument();
});

test('page shows the image', () => {
  render(<NotFound />);
  expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
    .toHaveAttribute('src', expect.stringContaining('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
});
