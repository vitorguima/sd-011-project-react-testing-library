import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Test render "Page request not found"', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const notShow = getByAltText(/pikachu crying/i);
  expect(notShow).toBeInTheDocument();
  expect(notShow.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
