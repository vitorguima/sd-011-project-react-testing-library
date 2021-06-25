import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('4- Test <NotFound.js /> component', () => {
  it('Should NotFound page contain a message "Page requested not found"', () => {
    const { getByText } = render(<NotFound />);
    const message = getByText(/Page requested not found/i);

    expect(message).toBeInTheDocument();
  });

  it('Should display a Pikachu crying image', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText(/Pikachu crying/i);

    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
