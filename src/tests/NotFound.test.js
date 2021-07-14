import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  it('if there is a message for not found page', () => {
    const { getByText } = render(<NotFound />);

    const pageNotFoundMessage = getByText(/Page requested not found/i);

    expect(pageNotFoundMessage).toBeInTheDocument();
  });

  it('if the page shows the correct image', () => {
    const { getByAltText } = render(<NotFound />);

    const pageNotFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(pageNotFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
