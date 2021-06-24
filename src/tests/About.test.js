import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('testes do componente About', () => {
  test('renderiza informações sobre pokedex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const info = getByText(/simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  // https://testing-library.com/docs/react-testing-library/api/#container
  test('renderiza h2 com texto About', () => {
    const { container } = render(<About />);
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('About Pokédex');
  });

  test('renderiza dois paragrafos', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  test('renderiza imagem', () => {
    const { container } = render(<About />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
