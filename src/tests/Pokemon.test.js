import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente Pokemon - R6', () => {
  it('Verifica se o poke é renderizado', () => {
    const { getByText, getAllByText, getByRole } = renderWithRouter(<App />);
    const pokemon = getByText(/Pikachu/i);
    const type = getAllByText(/Electric/i);
    const weight = getByText(/Average weight: 6.0 kg/i);
    const img = getByRole('img');
    expect(pokemon).toBeInTheDocument();
    expect(type[0]).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });
  it('Verifica se o componente possui link para detalhes', () => {
    const { getByRole, getByTestId, history } = renderWithRouter(<App />);
    const typeBtn = getByRole('button', { name: /Fire/i });
    fireEvent.click(typeBtn);
    const linkDet = getByRole('link', { name: /More details/i });
    expect(linkDet).toBeInTheDocument();
    fireEvent.click(linkDet);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/4');
    const typeText = getByTestId(/pokemon-type/i);
    expect(typeText.innerHTML).toBe('Fire');
  });
  it('Verifica se o componente possui link para detalhes', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const typeBtn = getByRole('button', { name: /Fire/i });
    fireEvent.click(typeBtn);
    const linkDet = getByRole('link', { name: /More details/i });
    fireEvent.click(linkDet);
    const favInp = getByRole('checkbox');
    fireEvent.click(favInp);
    const img = getAllByRole('img');
    expect(img[1].src).toContain('star-icon.svg');
    expect(img[1].alt).toBe('Charmander is marked as favorite');
  });
});
