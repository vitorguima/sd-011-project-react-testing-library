import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test if all the Home page is being exhibited correctly', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test(('check if nav bar has Home, About and Favorite Pokémons'), () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const Home = getByText(/Home/i);
    const About = getByText(/About/i);
    const Favorite = getByText(/Favorite Pokémons/i);
    expect(Home && About && Favorite).toBeInTheDocument();
  });

  test('test Home redirect', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/);
    fireEvent.click(linkHome);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
});
