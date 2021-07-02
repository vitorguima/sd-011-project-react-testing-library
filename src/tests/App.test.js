import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('App tests', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('render pokedex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokedexTitle = getByText(/Pokédex/i);
    expect(pokedexTitle).toBeInTheDocument(/Pokédex/i);
  });

  it('renders a nav menu with 3 links', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const navMenu = getByRole('navigation');
    expect(navMenu).toBeInTheDocument();

    const [home, about, favorites] = getAllByRole('link');
    expect(home).toHaveTextContent('Home');
    expect(about).toHaveTextContent('About');
    expect(favorites).toHaveTextContent('Favorite Pokémons');
  });

  it('redirect to `/` when click on Home link in nav bar', () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const [home] = getAllByRole('link');
    fireEvent.click(home);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('redirect to `/about` when click on About link in nav bar', () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const [, about] = getAllByRole('link');
    fireEvent.click(about);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('redirect to `/favorites` when click on Favorite Pokémons link in nav bar', () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const [, , favorites] = getAllByRole('link');
    fireEvent.click(favorites);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  it('render `Not Found` when enter in unknown URL', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/agumon'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
