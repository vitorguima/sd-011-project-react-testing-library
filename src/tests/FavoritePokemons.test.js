import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('FavoritePokemon tests', () => {
  it('renders message "No favorite pokemon found"', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));
    const text = getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });

  // it('', () => {
  //   const { getByRole, getByText } = render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>,
  //   );
  // });
});
