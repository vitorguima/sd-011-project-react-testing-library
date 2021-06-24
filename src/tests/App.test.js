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
    let links;
    let getByText;
    let getAllByTestId;

    beforeAll(() => {
      ({ getAllByTestId, getByText } = renderWithHistory(<App />));
      links = getAllByTestId('nav-bar-link');
    });

    it('there are three links', () => {
      const TOTAL_LINKS = 3;
      expect(links.length).toBe(TOTAL_LINKS);
    });

    describe('the links are, in order:', () => {
      it('Home', () => {
        expect(links[0].innerHTML).toBe('Home');
      });
      it('About', () => {
        expect(links[1].innerHTML).toBe('About');
      });
      it('Favorite Pokémons', () => {
        expect(links[2].innerHTML).toBe('Favorite Pokémons');
      });
    });

    describe('the links redirect correctly', () => {
      beforeEach(() => {
        ({ getByText } = renderWithHistory(<App />));
        links = getAllByTestId('nav-bar-link');
      });

      it('to the /home page', async () => {
        fireEvent.click(links[0]);

        await sleep(NAVIGATE_DELAY);

        expect(getByText('Encountered pokémons')).toBeInTheDocument();
      });

      it('to the /about page', async () => {
        fireEvent.click(links[1]);

        await sleep(NAVIGATE_DELAY);

        expect(getByText('About Pokédex')).toBeInTheDocument();
      });

      it('to the /favorites page', async () => {
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
