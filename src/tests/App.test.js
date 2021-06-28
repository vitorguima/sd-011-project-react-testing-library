import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithHistory from './aux/renderWithHistory';
import sleep from './aux/sleep';
import App from '../App';

const NAVIGATE_DELAY = 100;
const linksLabels = {
  '/': 'Home',
  '/about': 'About',
  '/favorites': 'Favorite Pokémons',
};

describe('When the app loads:', () => {
  it('it is in the home page', () => {
    const { history } = renderWithHistory(<App />);
    expect(history.location.pathname).toBe('/');
  });

  describe('on the nav bar:', () => {
    const links = [];

    beforeAll(() => {
      const { getByRole } = renderWithHistory(<App />);

      const nav = getByRole('navigation');

      while (nav.lastChild) {
        links.unshift(nav.lastChild);
        nav.lastChild.remove();
      }
    });

    it('there are three links', () => {
      const TOTAL_LINKS = 3;
      expect(links.length).toBe(TOTAL_LINKS);
    });

    describe('the links are, in order:', () => {
      it('Home', () => {
        expect(links[0].innerHTML).toBe(linksLabels['/']);
      });
      it('About', () => {
        expect(links[1].innerHTML).toBe(linksLabels['/about']);
      });
      it('Favorite Pokémons', () => {
        expect(links[2].innerHTML).toBe(linksLabels['/favorites']);
      });
    });
  });
});

describe('The links on the nav bar redirect correctly', () => {
  it('to the /home page', async () => {
    const { getByText } = renderWithHistory(<App />);
    fireEvent.click(getByText(linksLabels['/']));

    await sleep(NAVIGATE_DELAY);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('to the /about page', async () => {
    const { getByText } = renderWithHistory(<App />);
    fireEvent.click(getByText(linksLabels['/about']));

    await sleep(NAVIGATE_DELAY);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('to the /favorites page', async () => {
    const { getByText } = renderWithHistory(<App />);
    fireEvent.click(getByText(linksLabels['/favorites']));

    await sleep(NAVIGATE_DELAY);

    expect(getByText('Favorite pokémons')).toBeInTheDocument();
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
