import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../Renderwithrouter';
import App from '../App';

describe('Testa se é renderazido o pokemon correto', () => {
  it('Testa se o pokemon é renderaziado corretamente', () => {
    const { getByText, getAllByText, getByRole } = renderWithRouter(<App />);
    const typeBtn = getByRole('button', { name: 'Normal' });
    fireEvent.click(typeBtn);
    const pokemon = getByText(/Snorlax/i);
    const type = getAllByText(/Normal/i);
    const peso = getByText(/Average weight: 460.0 kg/i);
    const img = getByRole('img');

    expect(pokemon).toBeInTheDocument();
    expect(type[1]).toBeInTheDocument();
    expect(peso).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    expect(img.alt).toBe('Snorlax sprite');
  });

  it('Testa o card e suas funcionalidades', () => {
    const { getByRole, getByTestId, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    const typeText = getByTestId(/pokemon-type/i);
    expect(typeText.innerHTML).toBe('Electric');
  });

  it('Testa o link com detalhes e favorito', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const moreDet = getByRole('link', { name: /More details/i });
    fireEvent.click(moreDet);
    const favorite = getByRole('checkbox');
    fireEvent.click(favorite);
    const img = getAllByRole('img');
    expect(img[1].src).toContain('star-icon.svg');
    expect(img[1].alt).toBe('Pikachu is marked as favorite');
  });
});
