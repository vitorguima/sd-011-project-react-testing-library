import React from 'react';
import { } from 'react-router-dom';

import renderWithHistory from './helpers/renderWithHistory';
import About from '../components/About';

describe('A página About:', () => {
  let getByText;
  let getAllByText;
  let getByRole;
  let getAllByRole;

  beforeEach(() => {
    ({ getByText, getAllByText, getByRole, getAllByRole } = renderWithHistory(<About />));
  });

  it('possui um h2 com o texto "About Pokédex"', () => {
    expect(getByRole('heading').innerHTML).toBe('About Pokédex');
  });

  it('possui dois parágrafos com texto sobre pokedex', () => {
    let totalParagraphs = 0;

    const elements = getAllByText(/.*/);

    elements.forEach((el) => {
      if (el.tagName === 'P') {
        totalParagraphs += 1;
      }
    });

    expect(totalParagraphs).toBe(2);
  });

  it('possui a imagem correta de pokedex', () => {
    const EXPECTED_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(getByRole('img').src).toBe(EXPECTED_URL);
  });
});
