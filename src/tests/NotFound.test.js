import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { NotFound } from '../components';

describe('Verifica requisito 4', () => {
  it('Teste este se página o texto Page requested not found 😭.', () => {
    renderWithRouter(<NotFound />);
    const not = screen.getByText(/Page requested not found/i);
    expect(not).toBeInTheDocument();
  });

  it('teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because /i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
