import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { NotFound } from '../components';

describe('Test the NotFound component', () => {
  it('Test if page contains an h2 and the text Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole(
      'heading',
      { level: 2, name: 'Page requested not found Crying emoji' },
    );
    const notFoundImage = screen.getAllByRole('img');

    expect(notFoundText).toBeDefined();
    expect(notFoundImage[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
