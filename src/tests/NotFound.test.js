import React from 'react';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('testa a aplicação NotFound', () => {
  it('a pagina contem um h2 com Page requested not found', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('//');
  });
});
