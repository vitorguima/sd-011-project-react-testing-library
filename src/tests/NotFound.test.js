import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

it('contains message `Page requested not found`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

it('cotains gif', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  expect(getByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
