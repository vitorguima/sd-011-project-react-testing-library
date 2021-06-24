import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('test the Component <NotFound />', () => {
  it('has a heading h2 with the text "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const aboutTitle = getByRole('heading', { level: 2 });
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle).toHaveTextContent('Page requested not found 😭');
  });

  it('renders the image of a pikachu crying with the alt text /Pikachu crying/', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(/Pikachu crying/);
    expect(notFoundImage).toBeInTheDocument();
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(notFoundImage.src).toBe(src);
  });
});
