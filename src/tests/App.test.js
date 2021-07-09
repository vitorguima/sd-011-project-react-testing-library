import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App component tests', () => {
  it('should render the homepage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/pokédex/i);
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
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should redirect to "/about" if About link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should redirect to "/favorites" if Favorite Pokémons link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
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
