import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('When render NotFound', () => {
  it('Have a <h2> with "Page not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', { level: 2 });
    expect(notFound.innerHTML).toBe('Page requested not found'
      + '<span role="img" aria-label="Crying emoji"> 😭</span>');
  });
  it('Have a img', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageNotFound = getByAltText('Pikachu crying because '
      + 'the page requested was not found');
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
