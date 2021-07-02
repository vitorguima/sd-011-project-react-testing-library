import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Test render "Page request not found"', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const checkHeader = getByText('Page requested not found');
  expect(checkHeader).toBeInTheDocument();
});

test('', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const notShow = getByAltText('/pikachu crying/i');
  expect(notShow).toBeInTheDocument();
  expect(notShow.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
