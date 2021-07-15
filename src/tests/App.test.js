import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('test APP', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('shows pokedex when the route is rendered', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('the page should contain links to Home, about and favorite', () => {
    const { getByText } = RenderWithRouter(<App />);
    expect(getByText(/home/i)).toBeInTheDocument();
    expect(getByText(/about/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Clik on Home go to Home', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const home = getByText(/home/i);
    fireEvent.click(home);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Clik on About go to About', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const about = getByText(/about/i);
    fireEvent.click(about);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('not found go to not found', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    history.push('/notfound/');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
