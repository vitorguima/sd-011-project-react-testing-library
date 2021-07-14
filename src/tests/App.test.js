import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('testa se a página inicial renderiza', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('testa se tem um conjunto de links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('testa a url de home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('testa a url de about', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText(/About/i);
    fireEvent.click(about);
    const aboutTitle = getByText(/About Pokédex/i);
    expect(aboutTitle).toBeInTheDocument();
  });

  it('testa a url de about', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const favTitle = getByText(/found/i);
    expect(favTitle).toBeInTheDocument();
  });

  it('testa url not found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/aaa'] }>
        <App />
      </MemoryRouter>,
    );
    const notFound = getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
