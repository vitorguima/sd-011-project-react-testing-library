import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js component', () => {
  it('should render specific text when page is not found', () => {
    render(<NotFound />);
    const headingText = screen.queryByText(/Page requested not found/i);
    expect(headingText).toBeVisible();
  });

  it('should render specific image', () => {
    render(<NotFound />);
    const image = screen.queryByAltText(/Pikachu crying/i);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
