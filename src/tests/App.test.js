// Requisito resolvido revendo aulas e acessando o site:
// https://testing-library.com/docs/queries/about/

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const checkLinks = container.querySelectorAll('.link');
  expect(checkLinks.length >= 1).toBe(true);
});

// test('Testa se os links Home, About e Favorite Pokémons', () => {
//   const { getByText } = render(<App />);

//   expect(getByText('Home')).toBeInTheDocument();
//   expect(getByText('About')).toBeInTheDocument();
//   expect(getByText('Favorite Pokémons')).toBeInTheDocument();
// });
