import React from 'react';

import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests in PokemonDetails Component', () => {
  it('Verify if render details', () => {
    const {
      getAllByRole,
      history,
      queryByText,
      getAllByAltText,
      getByLabelText,
      container } = renderWithRouter(<App />);

    history.push('/pokemons/4');

    const h2Elements = getAllByRole('heading', { level: 2 });
    // Pokemon Title
    expect(h2Elements[0].textContent).toBe('Charmander Details');
    // summary subtitle
    expect(h2Elements[1].textContent).toBe('Summary');
    // not exist More Details
    expect(queryByText('More details')).toBeNull();
    // resume paragraph
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs[3].textContent)
      .toBe('The flame on its tail shows the strength of its life force. If it is weak, '
        + 'the flame also burns weakly.');
    // location subtitle images
    expect(h2Elements[2].textContent).toBe('Game Locations of Charmander');

    const imageLength = 4;
    const altImage = getAllByAltText('Charmander location');
    expect(altImage.length).toBe(imageLength);
    expect(altImage[0].src).not.toBe('');
    expect(altImage[0].nextSibling.nodeName).toBe('P');
    expect(altImage[1].src).not.toBe('');
    expect(altImage[1].nextSibling.nodeName).toBe('P');
    expect(altImage[2].src).not.toBe('');
    expect(altImage[2].nextSibling.nodeName).toBe('P');
    expect(altImage[3].src).not.toBe('');
    expect(altImage[3].nextSibling.nodeName).toBe('P');

    const favoriteInput = getByLabelText('Pokémon favoritado?');
    expect(favoriteInput).toBeInTheDocument();
    fireEvent.click(favoriteInput);
    expect(favoriteInput.checked).toBeTruthy();
    fireEvent.click(favoriteInput);
    expect(favoriteInput.checked).toBeFalsy();
  });
});
