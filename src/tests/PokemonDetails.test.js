import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

const detail = 'More details';
describe('Testa componente PokemonDetails', () => {
  it('Testa informações detalhadas', () => {
    const { getByText, getByRole, container } = RenderWithRouter(<App />);
    const link = getByText(detail);
    fireEvent.click(link);
    expect(link).not.toBeInTheDocument();
    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
    const h2Heading = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(h2Heading).toBeInTheDocument();
    const paragraph = container.querySelectorAll('p');
    expect(paragraph[3].textContent).toContain('This intelligent Pokémon');
  });
  it('Testa seção com mapas', () => {
    const { getByText, getByRole, getAllByRole } = RenderWithRouter(<App />);
    const link = getByText(detail);
    fireEvent.click(link);
    const h2Heading = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(h2Heading).toBeInTheDocument();
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].alt).toBe('Pikachu location');
  });
  it('Testa favoritar', () => {
    const { getByText, getByLabelText } = RenderWithRouter(<App />);
    const link = getByText(detail);
    fireEvent.click(link);
    const toFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(toFavorite);
    const favoritePokemon = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemon);
    // encontrei em https://pt-br.reactjs.org/docs/test-renderer.html#testrendereract uma
    // maneira de testar props, acredito que seja a maneira mais adequada para esse requisito
    const pokemonName = getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
