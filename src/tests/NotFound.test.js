import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('<NotFound.js /> component testing', () => {
  it('contains h2 heading with the text "Page requested not found 😭"', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  it('contains image of Pokédex', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
