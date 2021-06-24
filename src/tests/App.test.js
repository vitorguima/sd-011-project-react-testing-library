import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
// import renderWithRouter from '../renderWithRouter';

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

  // test('', () => {})
});
