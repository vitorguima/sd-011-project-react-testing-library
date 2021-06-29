import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test Not found component', () => {
  it('Test if the page contains a h2 heading with Page reqeust not found text', () => {
    const { container } = render(<NotFound />);
    const element = container.querySelector('h2');
    expect(element.textContent).toBe('Page requested not found 😭');
  });

  it('Test if page render image', () => {
    const { container } = render(<NotFound />);
    const element = container.querySelector('img');
    expect(element.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
