import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requisito 7', () => {
  it('if pokemon\'s heading details is correct', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const headingElement = getByText(/Pikachu Details/i);

    expect(headingElement).toBeInTheDocument();
  });

  it('if pokemon\'s link details not exists', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    expect(moreDetailsElement).not.toBeInTheDocument();
  });

  it('if pokemon\'s summary is correct', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const summaryElement = getByText(/summary/i);

    expect(summaryElement).toBeInTheDocument();
  });

  it('if pokemon\'s paragraph exists', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const paragraphElement = getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(paragraphElement).toBeInTheDocument();
  });

  it('if pokemon\'s game location is correct', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const locationHeadingElement = getByText(/Game Locations of Pikachu/i);

    expect(locationHeadingElement).toBeInTheDocument();
  });

  it('if pokemon\'s location to have 2 childrens', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const imageElement = getAllByAltText(/Pikachu location/i);
    expect(imageElement[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageElement[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const firstText = getByText(/Kanto Viridian Forest/);
    const lastText = getByText(/Kanto Power Plant/);

    expect(firstText).toBeInTheDocument();
    expect(lastText).toBeInTheDocument();
  });

  it('if pokemon\'s favorite star exists', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const toFavorite = document.getElementById('favorite');

    expect(toFavorite).toBeInTheDocument();
  });

  it('if pokemon\'s favorite star works', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const toFavorite = document.getElementById('favorite');
    fireEvent.click(toFavorite);

    const favoriteStar = getByAltText(/pikachu is marked as favorite/i);

    expect(favoriteStar).toBeInTheDocument();

    fireEvent.click(toFavorite);

    expect(favoriteStar).not.toBeInTheDocument();
  });

  it('if pokemon\'s favorite star has a label', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);
    const moreDetailsElement = getByText(/more details/i);
    fireEvent.click(moreDetailsElement);

    const toFavorite = getByLabelText(/Pokémon favoritado/);

    expect(toFavorite).toBeInTheDocument();
  });
});
