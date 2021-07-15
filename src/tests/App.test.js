import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Test the <App /> component', () => {
  it('renders header with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const header = getByText(/Pokédex/i);

    expect(header).toBeInTheDocument();
  });

  it('renders a navigation bar with links of Home, About and Favorites Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText('Favorite Pokémons');

    expect(home).toHaveTextContent('Home');
    expect(about).toHaveTextContent('About');
    expect(favorites).toHaveTextContent('Favorite Pokémons');
  });

  it('redirects properly each route (Home, About and Favorite)', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText(/Favorite Pokémons/i);

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('redirects when an invalid url is typed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/my-bank-account');

    expect(history.location.pathname).toBe('/my-bank-account');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});

// Source: consulta ao repositório https://github.com/tryber/sd-011-project-react-testing-library/pull/166/