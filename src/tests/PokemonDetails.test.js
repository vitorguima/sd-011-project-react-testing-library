import React from 'react';
import { fireEvent } from '@testing-library/dom';

import renderWithHistory from './aux/renderWithHistory';
import sleep from './aux/sleep';

import pokemons from '../data';

import App from '../App';

const NAVIGATION_DELAY = 100;
const DETAILS_BUTTON_TEXT = 'More details';

function getNextParagraphSibling(HTMLElement) {
  if (!HTMLElement || HTMLElement.tagName === 'P') {
    return HTMLElement;
  }

  return getNextParagraphSibling(HTMLElement.nextSibling);
}

describe('Renders the correct elements', () => {
  let getByText;
  let queryByText;
  let getAllByAltText;

  const TEST_POKEMON = pokemons[0];

  beforeEach(async () => {
    ({ getByText, queryByText, getAllByAltText } = renderWithHistory(<App />));
    fireEvent.click(getByText(DETAILS_BUTTON_TEXT));
    await sleep(NAVIGATION_DELAY);
  });

  it('main heading', () => {
    expect(getByText(`${TEST_POKEMON.name} Details`)).toBeInTheDocument();
  });

  it('NO details link', () => {
    expect(queryByText(DETAILS_BUTTON_TEXT)).not.toBeInTheDocument();
  });

  it('summary section', () => {
    const summaryHeading = getByText('Summary');
    expect(summaryHeading.tagName).toBe('H2');

    const summaryParagraph = getNextParagraphSibling(summaryHeading);

    expect(summaryParagraph).toHaveTextContent(TEST_POKEMON.summary);
  });

  describe('map section with:', () => {
    it('heading', () => {
      const headingText = `Game Locations of ${TEST_POKEMON.name}`;
      expect(getByText(headingText)).toBeInTheDocument();
    });

    it('map locations', () => {
      const mapImages = getAllByAltText(`${TEST_POKEMON.name} location`);

      for (let i = 0; i < mapImages.length; i += 1) {
        expect(mapImages[i].src).toBe(TEST_POKEMON.foundAt[i].map);
      }
    });
  });
});

it('Allows user to favorite and unfavorite pokemon', async () => {
  const { queryByAltText, getByText, getByLabelText } = renderWithHistory(<App />);
  fireEvent.click(getByText(DETAILS_BUTTON_TEXT));
  await sleep(NAVIGATION_DELAY);

  const TEST_POKEMON = pokemons[0];

  const ALT_TEXT = `${TEST_POKEMON.name} is marked as favorite`;

  const favoriteButton = getByLabelText('Pokémon favoritado?');

  expect(queryByAltText(ALT_TEXT)).not.toBeInTheDocument();
  fireEvent.click(favoriteButton);
  expect(queryByAltText(ALT_TEXT)).toBeInTheDocument();
  fireEvent.click(favoriteButton);
  expect(queryByAltText(ALT_TEXT)).not.toBeInTheDocument();
});
