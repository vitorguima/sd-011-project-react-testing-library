import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a pagina about tem informações sobre a Pokedex', () => {
    const { getByRole } = render(<About />);
    const aboutContent = getByRole('heading');
    const imgContent = getByRole('img');
    expect(imgContent).toBeInTheDocument();
    expect(aboutContent).toBeInTheDocument();
  });

  test('Teste se a pagina contém um heading h2 com texto About...', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading');

    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML).toBe('About Pokédex');
  });

  test('Teste se a pagina about tem 2 <p> com informações...', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  test('Testa se contém a seguinte imagem...', () => {
    const { getByRole } = render(<About />);
    const getImage = getByRole('img');
    expect(getImage).toBeInTheDocument();
    expect(getImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png')
  });
});
