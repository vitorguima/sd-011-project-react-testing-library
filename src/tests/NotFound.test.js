import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../RenderWithRouter';

describe('tests NotFound component', () => {
  it('checks if there is a message `Page requested not found`', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundMessage = getByText('Page requested not found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('checks if there is an specific rendered image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const logo = getAllByRole('img')[1];
    const logoSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(logo).toHaveAttribute('src', logoSource);
  });
});
