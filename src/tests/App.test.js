import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Verifies if the App component', () => {
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

  it('verify the nav links', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const linkHome = getByText(/Home/i);
    const linkAbout = getByText(/About/i);
    const linkFavs = getByText(/Favorite Pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavs).toBeInTheDocument();
  });

  it('uses the Home link to change the route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const linkHome = getByText(/Home/i);
    expect(linkHome.classList.contains('link')).toBe(true);
    fireEvent.click(linkHome);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('uses the About link to change the route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const linkAbout = getByText(/About/i);
    expect(linkAbout.classList.contains('link')).toBe(true);
    fireEvent.click(linkAbout);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('uses the Favorite Pokémons link to change the route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const linkFavs = getByText(/Favorite Pokémons/i);
    expect(linkFavs.classList.contains('link')).toBe(true);
    fireEvent.click(linkFavs);

    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  it('shows the not-found page to unknown routes', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/not-found'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
