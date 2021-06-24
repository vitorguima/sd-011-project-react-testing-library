import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Verifies the About component', () => {
  it('renders a h2 with the text `Page requested not found 😭`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(getByText('😭')).toBeInTheDocument();
  });

  it('renders an gif of the of a sad Pikachu', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const notFoundImgs = getAllByRole('img');
    expect(notFoundImgs.length).toBe(2);
    expect(notFoundImgs[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
