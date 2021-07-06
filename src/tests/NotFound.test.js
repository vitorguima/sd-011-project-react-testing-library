import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('Test the <NotFound.js /> component', () => {
  const { getByAltText, getByText } = renderWithRouter(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
  expect(getByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
