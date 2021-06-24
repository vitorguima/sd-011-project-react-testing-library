import React from 'react';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('testa a aplicação NotFound', () => {
  it('a pagina contem um h2 com Page requested not found', () => {
    const { history, container } = RenderWithRouter(<App />);
    history.push('/digimon/');
    expect(container.querySelector('h2')).toHaveTextContent('Page requested not found');
    expect(container.querySelector('img')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
