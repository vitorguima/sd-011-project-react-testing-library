import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Check the functions of page details', () => {
  it('Test if the page contain "<name> Details" ', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const textDetails = getByText(/more details/i);
    userEvent.click(textDetails);
    const infoPokemon = getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(infoPokemon).toBeInTheDocument();
  });

  it('Test if don´t exist link navigation to pokemon selected ', () => {
    const { getByText } = renderWithRouter(<App />);
    const textDetails = getByText(/more details/i);
    userEvent.click(textDetails);
    expect(textDetails).not.toBeInTheDocument();
  });

  it('Test if page contain text Summary', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const textDetails = getByText(/more details/i);
    userEvent.click(textDetails);
    const infoSummary = getByRole('heading', { name: /summary/i, level: 2 });
    expect(infoSummary).toBeInTheDocument();
  });

  it('Test if page contain a paragraph', () => {
    const { getByText } = renderWithRouter(<App />);
    const textDetails = getByText(/more details/i);
    userEvent.click(textDetails);
    const paragraph = getByText(/this intelligent pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Test if user can favorited a pokemon', () => {
    const { getByLabelText, getByRole } = renderWithRouter(<App />);
    const Url = getByRole('link', { name: /more details/i });
    userEvent.click(Url);
    const label = getByLabelText(/pokémon favoritado?/i);
    const checkbox = getByRole('checkbox');
    userEvent.click(label);
    const selected = getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(selected).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(selected).not.toBeInTheDocument();
  });
  // Este ultimo it usei como base PR # 81 //
  it('Test if exist a section contain maps and locations of pokemons', () => {
    const pokemon = pokemons[0];
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const textDetails = getByText(/more details/i);
    fireEvent.click(textDetails);
    expect(getByText(`Game Locations of ${pokemon.name}`)).toBeInTheDocument();
    const location = getAllByAltText(`${pokemon.name} location`);
    expect(location.length).toBe(pokemon.foundAt.length);
    for (let i = 0; i < location.length; i += 1) {
      const img = location[i];
      expect(img.src).toBe(pokemon.foundAt[i].map);
    }
  });
});
