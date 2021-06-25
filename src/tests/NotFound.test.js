import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test the NotFound Component', () => {
  it('Verify if the page contains a H2 with the text "Page requested no found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2Title = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(h2Title).toBeInTheDocument();
  });

  it('Test if the page show the image "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif" ', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(/Pikachu crying/i);
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
