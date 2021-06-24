import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('renders a reading with the text `Page requested not found 😭` in a <h2>', () => {
  const { getByText, getByRole } = renderWithRouter(<NotFound />);
  const h2 = getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  const text = getByText(/Page requested not found/);
  expect(text).toBeInTheDocument();
});

test('renders a specified image', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText(/Pikachu crying because the page requested was not found/);
  const { src } = image;
  expect(src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
