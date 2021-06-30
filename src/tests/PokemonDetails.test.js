import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 7 - Teste o componente <PokemonDetails/>', () => {
  const detalhes = 'More details';
  it('Testa se os detalhes do Pokémon selecionado são mostrados na tela', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByText(detalhes);
    fireEvent.click(link);
    const text = getByText(/Pikachu Details/);
    expect(text).toBeInTheDocument();
    const element = getByRole('heading', { name: 'Summary' });
    expect(element).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon roasts hard/);
    expect(paragraph).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getAllByAltText, getByText } = renderWithRouter(<App />);
    const link = getByText(detalhes);
    fireEvent.click(link);
    const element = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(element).toBeInTheDocument();
    const image = getAllByAltText('Pikachu location');
    expect(image.length).toBe(2);
    expect(image[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);
    const link = getByText(detalhes);
    fireEvent.click(link);
    const element = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    const favorites = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favorites);
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star.src).toContain('/star-icon.svg');
  });
});
