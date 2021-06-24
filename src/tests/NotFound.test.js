import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole, getByAltText } = render(<NotFound />);
    const heading = getByRole('heading');
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML)
      .toContain('Page requested not found');
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
