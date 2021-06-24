import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithHistory from './helpers/renderWithHistory';
import sleep from './helpers/sleep';
import App from '../App';

const NAVIGATE_DELAY = 100;

describe('When the app loads:', () => {
  it('it is in the home page', () => {
    const { history } = renderWithHistory(<App />);
    expect(history.location.pathname).toBe('/');
  });

  describe('on the nav bar:', () => {

    it('there are three links', () => {
      const { getAllByTestId, getByText } = renderWithHistory(<App />);
      const links = getAllByTestId('nav-bar-link');
      const TOTAL_LINKS = 3;
      expect(links.length).toBe(TOTAL_LINKS);
    });

    describe('the links are, in order:', () => {
      it('Home', () => {
        const { getAllByTestId, getByText } = renderWithHistory(<App />);
        const links = getAllByTestId('nav-bar-link');
        expect(links[0].innerHTML).toBe('Home');
      });
      it('About', () => {
        const { getAllByTestId, getByText } = renderWithHistory(<App />);
        const links = getAllByTestId('nav-bar-link');
        expect(links[1].innerHTML).toBe('About');
      });
      it('Favorite Pokémons', () => {
        const { getAllByTestId, getByText } = renderWithHistory(<App />);
        const links = getAllByTestId('nav-bar-link');
        expect(links[2].innerHTML).toBe('Favorite Pokémons');
      });
    });

    describe('the links redirect correctly', () => {
      it('to the /home page', async () => {
        const { getAllByTestId, getByText } = renderWithHistory(<App />);
        const links = getAllByTestId('nav-bar-link');
        fireEvent.click(links[0]);

        await sleep(NAVIGATE_DELAY);

        expect(getByText('Encountered pokémons')).toBeInTheDocument();
      });

      it('to the /about page', async () => {
        const { getAllByTestId, getByText } = renderWithHistory(<App />);
        const links = getAllByTestId('nav-bar-link');
        fireEvent.click(links[1]);

        await sleep(NAVIGATE_DELAY);

        expect(getByText('About Pokédex')).toBeInTheDocument();
      });

      it('to the /favorites page', async () => {
        const { getAllByTestId, getByText } = renderWithHistory(<App />);
        const links = getAllByTestId('nav-bar-link');
        fireEvent.click(links[2]);

        await sleep(NAVIGATE_DELAY);

        expect(getByText('Favorite pokémons')).toBeInTheDocument();
      });
    });
  });
});

describe('When the user goes to a non-existing url', () => {
  it('the 404 page is rendered', async () => {
    const { history, getByText } = renderWithHistory(<App />);

    history.push('/pokemao');

    await sleep(NAVIGATE_DELAY);

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
