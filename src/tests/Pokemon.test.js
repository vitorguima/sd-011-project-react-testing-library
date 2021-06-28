import React from 'react';
import { fireEvent } from '@testing-library/dom';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa renderização de um card', () => {
    const { getByTestId, getByAltText } = RenderWithRouter(<App />);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemon-type').textContent).toBe('Electric');
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Testa link do Card', () => {
    const { getByText, getByAltText, history } = RenderWithRouter(<App />);
    const home = history.location.pathname;
    expect(home).toBe('/');
    const link = getByText('More details');
    fireEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
    const pikachuDetails = getByText(/Pikachu Details/i);
    expect(pikachuDetails).toBeInTheDocument();
    const title = getByText(/Pikachu Details/i);
    expect(title).toBeInTheDocument();
    const addFavorite = getByText('Pokémon favoritado?');
    fireEvent.click(addFavorite);
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/star-icon.svg');
  });
});
