import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Test the App requirements', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Test the navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Test if URL "/" returns to Home when clicked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const home = screen.getByText(/home/i);
    expect(home.classList.contains('link')).toBe(true);
    fireEvent.click(home);
    expect(screen.getByText(/encountered pokémons/i));
  });

  test('Test if the URL "/about" redirects to About when clicked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const about = screen.getByText(/about/i);
    expect(about.classList.contains('link')).toBe(true);
    fireEvent.click(about);
    expect(screen.getByText(/about pokédex/i));
  });

  test('Test if the URL "/favorites" redirects to Favorite Pokémons when clicked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favorite = screen.getByText(/favorite pokémons/i);
    expect(favorite.classList.contains('link')).toBe(true);
    fireEvent.click(favorite);
    expect(screen.getByText('Favorite pokémons'));
  });

  test('Test if an unknown URL redirected to page "Not Found"', () => {
    render(
      <MemoryRouter initialEntries={ ['/Nescau_is_better_than_Toddy!'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[1].classList.contains('not-found-image')).toBe(true);
  });
});
