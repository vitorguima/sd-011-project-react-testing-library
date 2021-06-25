import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('requirement 7 - test the PokemonDetails.js component', () => {
  it('selected pokemon detailed information is displayed on the screen', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const detailsLink = getByText('More details');
    userEvent.click(detailsLink);
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon roasts hard berries with/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('section on the page with maps containing the pokemon location', () => {
    const { getAllByRole, getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByText(/More Details/i));
    expect(getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu',
    })).toBeInTheDocument();
    const imagens = getAllByRole('img').filter((img) => img.alt === 'Pikachu location');
    expect(imagens.length).toBe(2);
    expect(imagens[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagens[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('user can bookmark a pokemon through the details page', () => {
    const {
      getByText,
      getByRole,
    } = renderWithRouter(<App />);

    userEvent.click(getByText(/More details/i));
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();

    userEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox')).toBeChecked();
  });
});
