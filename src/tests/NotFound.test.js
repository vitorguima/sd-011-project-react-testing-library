import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste o componente `<NotFound.js />`', () => {
  it('Teste se página contém um heading `h2` com o texto'
  + '`Page requested not found 😭`', () => {
    render(<NotFound />);
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem do Pikachu', () => {
    render(<NotFound />);
    const pikachuImage = screen.getByAltText('Pikachu crying because '
    + 'the page requested was not found');
    expect(pikachuImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
