import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4', () => {
  it('not found', () => {
    const { container } = renderWithRouter(<App />, { route: '/not/found' });
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('Page requested not found 😭');
  });
  it('img src teste', () => {
    const { container } = renderWithRouter(<App />, { route: '/not/found' });
    const img = container.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
