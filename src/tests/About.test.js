import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testes requisito 2', () => {
  it('Tests if the page contains info about the Pokédex', () => {
    const { getByText } = render(<About />);

    expect(getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  it('Tests if theres a h2 with About Pokédex', () => {
    const { getByText } = render(<About />);

    expect(getByText(/About pokédex/i)).toBeInTheDocument();
  });

  it('Tests if theres two paragraphs with info about the Pokédex', () => {
    const { getByText } = render(<About />);

    expect(getByText(/This application simulates/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons/i)).toBeInTheDocument();
  });

  it('Tests if it has the given img url path', () => {
    const { getByAltText } = render(<About />);

    const img = getByAltText('Pokédex');

    expect((img).src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
