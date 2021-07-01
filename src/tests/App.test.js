import React from 'react';
import renderRouter from '../renderRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

test('shows the Pokédex route`/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const heading = getByText(/Pokédex/i);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
