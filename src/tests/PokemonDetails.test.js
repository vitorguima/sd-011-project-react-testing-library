import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing Pokemon Details Page', () => {
  it('testing if detail info of selected pokemon is showed', () => {
    const { getByRole, getByText, queryByText } = renderWithRouter(<App />);
    const fireButton = getByRole('button', { name: /Fire/i });
    fireEvent.click(fireButton);
    const linkToDetails = getByRole('link', { name: /More details/i });
    fireEvent.click(linkToDetails);
    const text = getByText('Charmander Details');
    const title = getByRole('heading', { level: 2, name: /Summary/ });
    const paragraph = getByText(/The flame o/i);
    expect(text).toBeInTheDocument();
    expect(queryByText(/More details/i)).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
  it('testing if theres a map section on where to find the pokemon', () => {
    const { getByRole, getAllByText, getAllByRole } = renderWithRouter(<App />);
    const poisonButton = getByRole('button', { name: /Poison/i });
    fireEvent.click(poisonButton);
    const linkToDetails = getByRole('link', { name: /More details/i });
    fireEvent.click(linkToDetails);
    const img = getAllByRole('img');
    const section = getByRole('heading', { level: 2,
      name: /Game Locations of Ekans/ });
    const location = getAllByText(/Corner/i);
    const n = 1;
    expect(section).toBeInTheDocument();
    expect(location.length).toEqual(n);
    expect(img[1].src).toContain('https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(img[1].alt).toContain('Ekans location');
  });

  it('testinf if pokemon can be favorite on details page', () => {
    const { getByRole, getAllByRole, getByLabelText } = renderWithRouter(<App />);
    const fireButton = getByRole('button', { name: /Fire/i });
    fireEvent.click(fireButton);
    const linkToDetails = getByRole('link', { name: /More details/i });
    fireEvent.click(linkToDetails);
    const favoritePokemon = getByRole('checkbox');
    fireEvent.click(favoritePokemon);
    const favoriteImage = getAllByRole('img');
    const label = getByLabelText(/Pokémon favoritado/);
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoriteImage[1].alt).toContain('Charmander is marked as favorite');
    fireEvent.click(favoritePokemon);
    expect(favoriteImage[1]).not.toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
