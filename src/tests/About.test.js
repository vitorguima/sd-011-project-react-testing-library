import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('2- Test <About.js /> component', () => {
  it('Should About page contain infomation about Pokédex', () => {
    const { getByText } = render(<About />);
    const firstInfo = getByText(/This application simulates a Pokédex/i);
    const secondInfo = getByText(/One can filter Pokémons by type/i);

    expect(firstInfo).toBeInTheDocument();
    expect(secondInfo).toBeInTheDocument();
  });

  it('Should have an <h2> with text About Pokédex', () => {
    const { getByText } = render(<About />);
    const title = getByText('About Pokédex');

    expect(title).toBeInTheDocument();
  });

  it('Should have an image', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');

    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
