import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('<Pokemon.js /> component testing', () => {
  it('renders card containing Pokémon information', () => {
    const { getByTestId, container } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const image = container.querySelector('img');
    expect(name.textContent).toBe('Pikachu');
    expect(type.textContent).toBe('Electric');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });
  it('contains link that redirects to Pokémon details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('contains star icon for favorite Pokémons', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByText('Pokémon favoritado?'));
    const star = container.querySelectorAll('img')[1];
    expect(star.src).toMatch('/star-icon.svg');
    expect(star.alt).toBe('Pikachu is marked as favorite');
  });
});
