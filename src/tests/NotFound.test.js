import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente Not-Found', () => {
  it('Test if page contain h2 with text { Encountered pokémons }', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingTwo = getByRole('heading', { level: 2 });
    expect(headingTwo.textContent).toBe('Page requested not found 😭');
  });

  it('Test if the component show image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImg = getByAltText(/Pikachu crying because/);
    expect(notFoundImg).toBeInTheDocument();
  });
});
