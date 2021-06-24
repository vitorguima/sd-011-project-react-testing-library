import React from 'react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('testa a aplicação na pagina About', () => {
  it('contem informaçoes sobre a Pokedex', () => {
    const { container, getByText, history } = renderWithRouter(<App />);
    history.push('/about/');
    const text = getByText(/About Pokédex/i);
    expect(text).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelectorAll('p')).toHaveLength(2);
    expect(container.querySelector('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
