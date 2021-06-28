import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing NotFound component', () => {
  it('test if screen have a h2 title', () => {
    const { getByText } = render(<NotFound />);
    const title = getByText('Page requested not found');
    expect(title).toBeInTheDocument();
  });

  it('test if screen have an image', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
