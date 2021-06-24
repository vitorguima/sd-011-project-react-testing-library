import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('App component tests', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it(
    'should display navigation links Home, About and Favorite Pokémons in that order',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const links = screen.getAllByRole('link');

      expect(links[0].innerHTML).toBe('Home');
      expect(links[1].innerHTML).toBe('About');
      expect(links[2].innerHTML).toBe('Favorite Pokémons');
    },
  );

  it('should redirect to "/" if Home link is clicked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByText(/home/i);
    expect(homeLink.classList.contains('link')).toBe(true);
    fireEvent.click(homeLink);
    expect(screen.getByText(/encountered pokémons/i));
  });

  it('should redirect to "/about" if About link is clicked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink.classList.contains('link')).toBe(true);
    fireEvent.click(aboutLink);
    expect(screen.getByText(/about pokédex/i));
  });

  it('should redirect to "/favorites" if Favorite Pokémons link is clicked', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoriteLink = screen.getByText(/favorite pokémons/i);
    expect(favoriteLink.classList.contains('link')).toBe(true);
    fireEvent.click(favoriteLink);
    expect(screen.getByText('Favorite pokémons'));
  });

  it('should render Not Found if URL path does not exist', () => {
    render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/page requested not found/i)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[1].classList.contains('not-found-image')).toBe(true);
  });
});
