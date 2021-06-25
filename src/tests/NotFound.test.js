import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js:', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('The page must contain the 404 message.', () => {
    const notFoundMessage = /Page requested not found Crying emoji/i;
    const notFoundHeading = screen.getByRole('heading', {
      name: notFoundMessage,
    });

    expect(notFoundHeading).toBeInTheDocument();
  });

  it('The page must contain the 404 image.', () => {
    const notFoundImage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const notFoundImageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe(notFoundImageSrc);
  });
});
