import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('tests NotFound component', () => {
  test('Test checks title with requested page text not found', () => {
    render(<NotFound />);
    const title = screen.getByText('Page requested not found');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  test('test checks contains picture', () => {
    render(<NotFound />);
    const image = screen.getAllByRole('img');
    const img = image[1].src;
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toEqual(link);
  });
});
