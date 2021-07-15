import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

// usando e ajudado pelo italo de mato turma 10 b e usando com referencia o git gub do filizola
// https://github.com/tryber/sd-011-project-react-testing-library/pull/13/files
describe('Test whether the entire home page is displayed correctly', () => {
  test('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('The first link has the text Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
  });

  test('The second link has the text About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText('About');
    expect(about).toBeInTheDocument();
  });

  test('The third link must have the text Favorite Pokemons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText('Favorite Pokémons');
    expect(about).toBeInTheDocument();
  });
});
