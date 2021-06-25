import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Página contém as infos sobre a Pokédex', () => {
  const { getByText, container } = render(<About />);
  const aboutText = getByText(/About Pokédex/);
  expect(aboutText).toBeInTheDocument();

  const pElement = container.querySelectorAll('p');
  expect(pElement.length).toBe(2);

  const imgElement = container.querySelector('img');
  expect(imgElement.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
