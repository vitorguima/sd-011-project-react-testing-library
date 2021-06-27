import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testa se página contém um h2', () => {
  const { container } = render(<NotFound />);

  const img = container.querySelectorAll('img')[0];
  expect(container.innerHTML).toMatch('Page requested not found');
  expect(img.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
