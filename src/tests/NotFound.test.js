import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o NotFound.js', () => {

  test('Testa se a aplicação é a redirecionada a not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/PáginaX');
    const title = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(title).toBeInTheDocument();
  });

  test('Testa se página mostra a imagem certa', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/PáginaX');
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
