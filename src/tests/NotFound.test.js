import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Check the functions of page Not Found', () => {
  it('check if page contain text "Page requested not found" ', () => {
    const { getByText, container } = renderWithRouter(<NotFound />);
    const textHeading = getByText(/Page requested not found/i);
    const header = container.querySelectorAll('h2');
    expect(header.length).toBe(1);
    expect(textHeading).toBeInTheDocument();
  });

  it('check if page show an image', () => {
    const { container } = renderWithRouter(<NotFound />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
