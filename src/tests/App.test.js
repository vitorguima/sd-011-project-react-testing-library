import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
describe('if on the application contains a fixed set of navigation links', () => {
  it('The first  link must have the text Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Home').innerHTML;
    expect(link).toBe('Home');
  });

  it('The second link must have the text About', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('About').innerHTML;
    expect(link).toBe('About');
  });

  it('the third link must have the text Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Favorite Pokémons').innerHTML;
    expect(link).toBe('Favorite Pokémons');
  });
});

test('is redirected to the home page (/)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const getInfo = getByText(/Encountered pokémons/);
  expect(getInfo).toBeInTheDocument();
});

test('is redirected to the About page (/About)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const getInfo = getByText(/About Pokédex/);
  expect(getInfo).toBeInTheDocument();
});

test('is redirected to the About page (/favorites)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const getInfo = getByText(/Favorite pokémons/);
  expect(getInfo).toBeInTheDocument();
});

test('is redirected to the Not Found page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/not Found page');
  const getInfo = getByText(/not found/i);
  expect(getInfo).toBeInTheDocument();
});
