import React from 'react';
import renderWithHistory from './aux/renderWithHistory';
import NotFound from '../components/NotFound';

describe('A página de não encontrado', () => {
  let getByRole;
  let getByAltText;

  beforeEach(() => {
    ({ getByRole, getByAltText } = renderWithHistory(<NotFound />));
  });

  it('possui um heading dizendo "Page requested not found"', () => {
    const heading = getByRole('heading');

    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/page requested not found/i);
  });

  it('possui um gif do pikachu chorando', () => {
    const imgSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', imgSource);
  });
});
