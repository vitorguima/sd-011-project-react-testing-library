import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing the App component', () => {
  it('Test if the home page is rendered correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Testing if the /about component is redirecting as it should', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const About = getByText(/About/i);
    userEvent.click(About);
    const aboutFragment = /This application simulates a Pokédex/i;
    expect(getByText(aboutFragment)).toBeInTheDocument();
  });

  it('Testing if the /home component is redirecting as it should', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    userEvent.click(home);
    const homeFragment = /Encountered pokémons/i;
    expect(getByText(homeFragment)).toBeInTheDocument();
  });

  it('Testing if the /favorites component is redirecting as it should', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorites = getByText(/Favorite Pokémons/i);
    userEvent.click(favorites);
    const favoritesFragment = /No favorite pokemon found/i;
    expect(getByText(favoritesFragment)).toBeInTheDocument();
  });

  it('Testing if the notFound component is redirecting as it should', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/nonexistentpage');
    expect(history.location.pathname).toBe('/nonexistentpage');
    const notFound = /Page requested not found/i;
    expect(getByText(notFound)).toBeInTheDocument();
  });
});
