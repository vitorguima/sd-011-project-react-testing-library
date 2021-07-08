import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing Pokemon Page', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const fireButton = getByRole('button', { name: /Fire/i });
    fireEvent.click(fireButton);
    const name = getByText('Charmander');
    const type = getByTestId('pokemon-type');
    const weight = getByText('Average weight: 8.5 kg');
    const image = getByRole('img');
    expect(name).toBeInTheDocument();
    expect(type.innerHTML).toBe('Fire');
    expect(weight).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(image.alt).toContain('Charmander sprite');
    expect(type.innerHTML).toBe('Fire');
  });

  it('testing if theres a link to details', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const fireButton = getByRole('button', { name: /Fire/i });
    fireEvent.click(fireButton);
    const linkToDetails = getByRole('link', { name: /More details/i });
    expect(linkToDetails).toBeInTheDocument();
    fireEvent.click(linkToDetails);
    const URL = '/pokemons/4';
    expect(history.location.pathname).toBe(URL);
  });

  it('testing if favorite pokemons have a star icon', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const fireButton = getByRole('button', { name: /Fire/i });
    fireEvent.click(fireButton);
    const linkToDetails = getByRole('link', { name: /More details/i });
    fireEvent.click(linkToDetails);
    const favorite = getByRole('checkbox');
    fireEvent.click(favorite);
    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Charmander is marked as favorite');
  });
});
