import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Renders Not Found page when a invalid url is requested', () => {
  it('render a header with text "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const message = getByRole('heading', { level: 2 });

    expect(message).toHaveTextContent(/Page requested not found/i);
  });

  it('render a not found image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(/Pikachu crying/i);

    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

// Source: consulta ao repositório https://github.com/tryber/sd-011-project-react-testing-library/pull/166/
