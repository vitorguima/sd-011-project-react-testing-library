import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testes do componente NotFound', () => {
  it('Contém um heading h2 com o texto /Page requested not found 😭/', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', { level: 2 }).innerHTML;

    expect(h2).toMatch(/Page requested not found/);
  });

  it('A página mostra uma imagem especifica', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const roles = getAllByRole('img');
    const { src } = roles[1];

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
