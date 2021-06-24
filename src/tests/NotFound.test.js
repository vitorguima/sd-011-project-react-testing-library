import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Test componnent Not Found', () => {
  it('Test if the page contains a heading (h2) with the text Page requested not found 😭',
    () => {
      const { getByText } = renderWithRouter(<NotFound />);
      const notFound = getByText('Page requested not found');

      expect(notFound).toBeInTheDocument();
    });

  it('', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgNotFound = getByAltText(/Pikachu crying because/i);

    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
