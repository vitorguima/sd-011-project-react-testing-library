import React from 'react';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  it('Teste se página contém um heading h2 com determinado texto', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading');
    expect(heading.textContent).toBe('Page requested not found 😭');
  });
});
