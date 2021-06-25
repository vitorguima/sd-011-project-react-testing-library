import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test NotFound component', () => {
  it('Verify if the text in heading are correct', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading');
    const text = 'Page requested not found 😭';
    expect(heading).toHaveTextContent(text);
  });

  it('Verify img', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(src);
  });
});
