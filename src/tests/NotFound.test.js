import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Not Found test', () => {
  test('Tests if page contains a heading h2 with text "Page requested not found found"',
    () => {
      const { getByRole } = render(<NotFound />);
      const h2Text = getByRole('heading');
      expect(h2Text.textContent).toBe('Page requested not found 😭');
    });

  test('Tests if the page shows the image',
    () => {
      const { container } = render(<NotFound />);
      const img = container.querySelector('.not-found-image');
      expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
