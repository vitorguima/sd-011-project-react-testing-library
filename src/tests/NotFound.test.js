import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';
import App from '../App';

test('should render a heading with a not found message', () => {
  render(
    <MemoryRouter initialEntries={ ['/xablau'] }>
      <App />
    </MemoryRouter>,
  );

  const notFoundHeading = screen.getByRole('heading', { level: 2 });
  expect(notFoundHeading).toHaveTextContent(/page requested not found/i);
  expect(notFoundHeading.lastChild).toHaveTextContent('😭');
});

test('test if the page constains the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const imgName = screen.getByAltText(
    /Pikachu crying because the page requested was not found/i,
  );
  expect(imgName).toBeInTheDocument();
  expect(imgName).toHaveAttribute('src', imgSrc);
});
