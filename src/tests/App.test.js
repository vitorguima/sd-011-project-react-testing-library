import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('<App.js /> component testing', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
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

  it('contains a fixed set of navigation links in the application', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('redirects and renders Home page when clicking on the "Home" link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirects and renders About page when clicking on the "About" link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirects and renders Favorite Pokémons page when clicking on the link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('renders Not Found page when landing on an unkown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/unknown');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
