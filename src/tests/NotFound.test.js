import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Check the behavior of the NotFound page', () => {
  it('', () => {
    const { getByText, getByAltText } = render(<NotFound />);

    const imgAltText = 'Pikachu crying because the page requested was not found';
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const title = getByText(/Page requested not found/);
    const notFoundImg = getByAltText(imgAltText);
    expect(title).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', imgSrc);
  });
});
