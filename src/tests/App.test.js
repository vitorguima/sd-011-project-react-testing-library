import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App.js component', () => {
  it('should render a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render a set of navigation links in the top of the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText(/Home/i);
    const aboutLink = getByText(/About/i);
    const favoritePokemonsLink = getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('should redirect to home page when the Home link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const homeButton = getByText(/Home/i);
    fireEvent.click(homeButton);
    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  it('should redirect to about page when the About link is clicked', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutButton = getByText(/About/i);
    fireEvent.click(aboutButton);
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });

  it('should redirect to favorites page when the link is clicked', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const favoritesButton = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesButton);
    const favoritesPage = getAllByText(/Favorite pokémons/i)[1];
    expect(favoritesPage).toBeInTheDocument();
  });

  it('should redirect to Not Found page when unknown path is entered', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/unknownpath');
    const notFoundPage = getByText(/Page requested not found/i);
    expect(notFoundPage).toBeInTheDocument();
  });
});
