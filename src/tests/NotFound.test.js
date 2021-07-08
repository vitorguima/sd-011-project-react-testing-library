import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('testing Not Found Page', () => {
  it('testing if the heading is h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const checkText = getByRole('heading', { level: 2 });
    const text = 'Page requested not found 😭';
    expect(checkText).toBeInTheDocument();
    expect(checkText).toHaveTextContent(text);
  });

  it('testing if there is a specific image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(/not found/i);
    expect(image.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
