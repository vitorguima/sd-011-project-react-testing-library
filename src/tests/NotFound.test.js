import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound tests', () => {
  it('renders "Page requested not found �"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/trybe'] }>
        <NotFound />
      </MemoryRouter>,
    );

    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  it('renders not found image', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/trybe'] }>
        <NotFound />
      </MemoryRouter>,
    );

    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getAllByRole('img');
    expect(image[1].src).toBe(imageURL);
  });
});
