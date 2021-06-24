import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('requirement 4 - test the NotFound.js component', () => {
  it('page contains a heading h2 with the text Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const title = getByRole('heading');
    expect(title).toHaveTextContent(/Page requested not found 😭/);
  });

  it('page shows the image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
