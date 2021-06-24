import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { container } = render(<About />);
  const getAbout = container.querySelector('h2');
  expect(getAbout.textContent).toBe('About Pokédex');

  const getP = container.querySelectorAll('p');
  expect(getP.length).toBe(2);
});
