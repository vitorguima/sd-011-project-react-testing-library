import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const detail = 'This intelligent Pokémon roasts hard berries with '
  + 'electricity to make them tender enough to eat.';

  it('se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const pokemon = getByText(`${pokemons[0].name} Details`);
    const heading = getByText(/Summary/i);
    const paragraph = container.querySelectorAll('p');
    expect(pokemon).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph[3].textContent).toBe(detail);
  });

  it('não deve existir o link de navegação para os detalhes.', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const pokemonDetails = queryByText(/More details/i);
    expect(pokemonDetails).not.toBeInTheDocument();
  });

  it('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const heading = queryByText(`Game Locations of ${pokemons[0].name}`);
    expect(heading).toBeInTheDocument();
  });

  it('Devem ser exibidos, o nome da localização e uma imagem do mapa', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const localName = getByText(`Game Locations of ${pokemons[0].name}`);
    const image = getAllByAltText(`${pokemons[0].name} location`);
    expect(localName).toBeInTheDocument();
    expect(image.length).toBe(2);
    expect(image[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});
