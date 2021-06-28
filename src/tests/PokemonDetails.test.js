import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('teste da aplicação PokemonDetails', () => {
  it('verifica informações detalhadas', () => {
    const { getByRole, getByText, queryByText } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /More details/i }));
    expect(getByText(/Details/i).innerHTML).toBe('Pikachu Details');
    expect(queryByText(/More details/i)).not.toBeInTheDocument();
    expect(getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(getByText(/This intelligent/i)).toBeInTheDocument();
  });
  it('verifica os mapas', () => {
    const { getByRole, getAllByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /More details/i }));
    expect(getAllByRole('img')[1])
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(getAllByRole('img')[1])
      .toHaveAttribute('alt', 'Pikachu location');
    expect(getAllByRole('img')[2])
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(getAllByRole('img')[2])
      .toHaveAttribute('alt', 'Pikachu location');
  });
  it('verifica o checkbox', () => {
    const { getByRole,
      getByLabelText, getAllByRole, getByText } = RenderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /More details/i }));
    expect(getByLabelText(/Pokémon favoritado/i)).toBeInTheDocument();
    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    expect(getAllByRole('img')[1].src)
      .toContain('star-icon.svg');
    expect(getAllByRole('img')[1])
      .toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(getByRole('heading', { name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();
    fireEvent.click(getByRole('link', { name: /Favorite Pokémons/i }));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
