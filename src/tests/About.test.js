import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Test page About', () => {
  const { getByText, getByRole } = render(<About />);

  expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  expect(getByRole('heading', { level: 2, name: 'About Pokédex' })).toBeInTheDocument();
  expect(getByRole('img').src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
