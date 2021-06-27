import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('4 - Tests the NotFound component', () => {
  it('should render h2 "page requested not found"', () => {
    render(<NotFound />);
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });

  it('should display a Pikachu crying picture', () => {
    render(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
