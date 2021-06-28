import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste dos componentes do <PokemonDetails.js/>', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const { getByRole, getByText, queryByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Fire/i });
    fireEvent.click(button);
    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const text = getByText('Charmander Details');
    const title = getByRole('heading', { level: 2, name: /Summary/ });
    const paragraph = getByText(/The flame o/i);
    expect(text).toBeInTheDocument();
    expect(queryByText(/More details/i)).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
  it('Seção com os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getAllByText, getAllByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Poison/i });
    fireEvent.click(button);
    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const img = getAllByRole('img');
    const section = getByRole('heading', { level: 2,
      name: /Game Locations of Ekans/ });
    const location = getAllByText(/Corner/i);
    const n = 1;
    expect(section).toBeInTheDocument();
    expect(location.length).toEqual(n);
    expect(img[1].src).toContain('https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(img[1].alt).toContain('Ekans location');
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByRole, getAllByRole, getByLabelText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: /Poison/i });
    fireEvent.click(button);
    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const check = getByRole('checkbox');
    fireEvent.click(check);
    const favorite = getAllByRole('img');
    const label = getByLabelText(/Pokémon favoritado/);
    expect(check).toBeInTheDocument();
    expect(favorite[1].alt).toContain('Ekans is marked as favorite');
    fireEvent.click(check);
    expect(favorite[1]).not.toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
