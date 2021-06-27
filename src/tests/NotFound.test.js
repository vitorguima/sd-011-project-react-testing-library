import { render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Tests requisito 4', () => {
  it('tests if theres a h2 tag with Page requested not found + emoji', () => {
    const { getByText } = render(<NotFound />);

    const heading = getByText(/page requested not found/i);

    expect(heading).toBeInTheDocument();
  });

  it('tests if theres an img with a given path', () => {
    const { getByRole } = render(<NotFound />);

    const gif = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });

    expect((gif).src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
