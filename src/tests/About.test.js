import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testing Requirement 02 - Component About.js', () => {
  it('Test if about page contains h2 with text <About Pokédex>', () => {
    const { getByText, container } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
    expect(container.getElementsByTagName('p')).toHaveLength(2);
  });

  it('Verify image link', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText('Pokédex');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(url);
  });
});
