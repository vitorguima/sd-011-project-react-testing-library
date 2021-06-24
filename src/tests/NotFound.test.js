import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Test the NotFound component', () => {
  test('Test if page contains a text Page requested "not found" 😭', () => {
    render(
      <MemoryRouter initialEntries={ ['/Nescau_is_better_than_Toddy!'] }>
        <App />
      </MemoryRouter>,
    );

    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toHaveTextContent(/page requested not found/i);
    expect(notFound.lastChild).toHaveTextContent('😭');
  });

  it('Test if the page shows the image', () => {
    render(
      <MemoryRouter initialEntries={ ['/Nescau_is_better_than_Toddy!'] }>
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
