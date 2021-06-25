import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing Requirement 04 - Component NotFound.js', () => {
  it('Test if about page contains h2 with text <Page requested not found 😭>', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(getByText('😭')).toBeInTheDocument();
  });

  it('Verify image link', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(url);
  });
});
