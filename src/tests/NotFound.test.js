import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Test Not Found page', () => {
  const { getByRole, getAllByRole } = render(<NotFound />);

  expect(getByRole('heading',
    { level: 2, name: /Page requested not found/i })).toBeInTheDocument();

  expect(getAllByRole('img')[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
