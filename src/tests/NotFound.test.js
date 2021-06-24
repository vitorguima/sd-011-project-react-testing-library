import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('NotFound component tests', () => {
  it('should render a heading with a message', () => {
    render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <App />
      </MemoryRouter>,
    );

    const notFoundHeading = screen.getByRole('heading', { level: 2 });
    expect(notFoundHeading).toHaveTextContent(/page requested not found/i);
    expect(notFoundHeading.lastChild).toHaveTextContent('😭');
  });

  it('should display an image', () => {
    render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <App />
      </MemoryRouter>,
    );

    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const images = screen.getAllByRole('img');
    const notFoundImage = images
      .find((image) => image.classList.contains('not-found-image'));
    expect(notFoundImage).not.toBeNull();
    expect(notFoundImage.src).toBe(imageLink);
  });
});
