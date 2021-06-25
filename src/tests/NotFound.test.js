import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Test if NotFound page have a text and GIF', () => {
  it('Verify if exists an `h2` with the text `Page requested not found 😭`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2Element = getByRole('heading');
    expect(h2Element.textContent).toBe('Page requested not found 😭');
  });

  it('Verify if exists image with pikachu crying gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const pikachuGif = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(pikachuGif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
