import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRoute from '../components/renderWithRouter';
import { NotFound } from '../components';

describe('Test battery for the NotFound component', () => {
  test(`Checks if the page contains a heading h2
  with the text 'Page requested not found'.`, () => {
    renderWithRoute(<NotFound />);

    const getByText = screen.getByText(/page requested not found/i);
    expect(getByText).toBeInTheDocument();
  });

  test('Check if the page shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRoute(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const linkForImageNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image).toHaveAttribute('src', linkForImageNotFound);
  });
});
