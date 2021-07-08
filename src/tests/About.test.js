import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About tests', () => {
  test('Tests if the page contains information about Pokédex',
    () => {
      const { getByText } = render(<About />);
      expect(getByText('About Pokédex')).toBeInTheDocument();
    });

  test('Tests if the page contains a heading h2 with the text "About Pokédex"',
    () => {
      const { getByRole } = render(<About />);
      const h2Text = getByRole('heading');
      expect(h2Text).toBeInTheDocument();
      expect(h2Text.textContent).toBe('About Pokédex');
    });

  test('Tests if the page contains two paragraphs with text about Pokédex',
    () => {
      const { container } = render(<About />);
      const paragraph = container.querySelectorAll('p');
      expect(paragraph.length).toBe(2);
    });

  test('Tests if the page contains a Pokédex image',
    () => {
      const { container } = render(<About />);
      const img = container.querySelector('img');
      expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
