import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Checks NotFound component', () => {
  it('Checks if the page has an h2 with the text Page requested not found 😭;', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/page/not-found/');
    const notFoundOnScreen = screen.getByRole('heading',
      { level: 2 });
    const text = screen.getByText(/Page requested not found/i);
    expect(notFoundOnScreen).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  it('Checks if the page has an image with an specific source;', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/page/not-found/');
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    // const image = screen.getByRole('img'); não rodou! Pq?
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

/*
Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif. */
