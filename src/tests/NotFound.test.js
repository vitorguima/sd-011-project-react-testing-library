import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testes da pagina Not Found', () => {
  it('testa se a página exibe o texto Page requested not found 😭', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />, ['/shalalala']);
    const heading = getByRole('heading', { level: 2, name: /Page requested not found/i });
    const emoji = getByLabelText(/Crying emoji/i);

    expect(heading).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  it('testa se a pagína renderiza a imagem correta', () => {
    const { container } = renderWithRouter(<App />, ['/shalalala']);
    const image = container.querySelector('img');
    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image).toHaveAttribute('src', imageLink);
  });
});
