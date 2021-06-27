import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o funcionamento do componente <PokemonDetails />', () => {
  it('Verifica se exibe os detalhes das informações', () => {
    const { getByRole, getByText, queryByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const details = getByText(/Details/i);
    expect(details.innerHTML).toBe('Pikachu Details');
    expect(queryByText(/More Details/i)).not.toBeInTheDocument();
    const summaryText = getByRole('heading', { name: /Summary/i });
    expect(summaryText).toBeInTheDocument();
    const pikachuText = getByText(/This intelligent/i);
    expect(pikachuText).toBeInTheDocument();
  });

  it('Verifica se exibe mapas', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].alt).toBe('Pikachu location');
  });

  it('Verifica se exibe checkbox', () => {
    const { getByRole,
      getByLabelText,
      getAllByRole,
      getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const checkbox = getByLabelText(/Pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toBe('Pikachu is marked as favorite');
    const heading = getByRole('heading', { name: /Game locations of pikachu/i });
    expect(heading).toBeInTheDocument();
    const favoriteLink = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favoriteLink);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
