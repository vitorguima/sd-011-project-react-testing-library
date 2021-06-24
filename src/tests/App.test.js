import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('requirement 1 - test the App.js component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('application contains a fixed set of navigation links', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('clicking / redirects the route "Home"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    expect(history.location.pathname).toBe('/');
  });

  it('clicking /abount redirects the route "About"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });

  it('clicking /favorites redirects the route "Favorite pokemons"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('redirect to `Page requested not found` when entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagetestenotfound');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
