import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRoute';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Primeiro requisito do projeto', () => {
  describe('Conjunto fixo de links de navegação.', () => {
    it('Link da página Home', () => {
      const { getByText } = renderWithRouter(<App />);
      const home = getByText(/Home/i);
      fireEvent.click(home);
    });

    it('Link da página About.', () => {
      const { getByText } = renderWithRouter(<App />);
      const about = getByText(/About/i);
      fireEvent.click(about);
    });

    it('Link da página favoritos', () => {
      const { getByText } = renderWithRouter(<App />);
      const favoritos = getByText(/Favorite Pokémons/i);
      fireEvent.click(favoritos);
    });
  });
});
