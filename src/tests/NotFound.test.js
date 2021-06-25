import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4 - NotFound', () => {
  it('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    expect(getByText('😭')).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { getAllByRole } = render(<NotFound />);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageNot = getAllByRole('img');
    expect(imageNot[1].src).toBe(imageUrl);
  });
});
