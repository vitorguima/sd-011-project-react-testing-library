import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('testa a aplicação pokemon', () => {
  it('verifica se o pokemon e renderizado', () => {
    const { getByText, getAllByText, getByRole } = RenderWithRouter(<App />);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(getAllByText(/Electric/i)[0]).toBeInTheDocument();
    expect(getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(getByRole('img')).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('possui link para detalhes', () => {
    const { getByRole, getByTestId, history } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: /Fire/i }));
    expect(getByRole('link', { name: /More details/i })).toBeInTheDocument();
    fireEvent.click(getByRole('link', { name: /More details/i }));
    expect(history.location.pathname).toBe('/pokemons/4');
    expect(getByTestId(/pokemon-type/i).innerHTML).toBe('Fire');
  });
  it('', () => {
    const { getByRole, getAllByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: /Fire/i }));
    fireEvent.click(getByRole('link', { name: /More details/i }));
    fireEvent.click(getByRole('checkbox'));
    expect(getAllByRole('img')[1].src).toContain('star-icon.svg');
    expect(getAllByRole('img')[1].alt).toBe('Charmander is marked as favorite');
  });
});
