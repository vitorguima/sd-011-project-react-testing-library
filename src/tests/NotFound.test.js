import React from 'react';
import NotFound from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Test the <NotFound.js /> component', () => {
  it('Test if page contains an h2 and the text Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const messageDisplay = getByRole('heading', { level: 2 });

    expect(messageDisplay).toHaveTextContent(/Page requested not found/i);
  });

  it('Test if image not found', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundIcon = getByAltText(/Pikachu crying/i);

    expect(notFoundIcon).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
