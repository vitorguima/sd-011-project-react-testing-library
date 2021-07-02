import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando PokemonDetails.js', () => {
  it(' informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByRole, history, getByText } = renderWithRouter(<App />);

    const detailsLink = (getByRole('link', { name: /More details/i }));

    fireEvent.click(getByText(/Poison/i));
    fireEvent.click(detailsLink);
    const URL = '/pokemons/23';
    expect(history.location.pathname).toBe(URL);
    expect(detailsLink).not.toBeInTheDocument();

    expect(getByText('Ekans Details')).toBeInTheDocument();
    expect(getByText('Ekans')).toBeInTheDocument();
    expect(getByText('Poison')).toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(/It can freely detach its jaw to swallow/i)).toBeInTheDocument();
  });

  it('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history, getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Dragon/i));
    fireEvent.click(getByRole('link', { name: /More details/i }));
    const URL = '/pokemons/148';
    expect(history.location.pathname).toBe(URL);

    expect(getByText('Game Locations of Dragonair')).toBeInTheDocument();
    const sumLocations = getAllByAltText('Dragonair location');
    const sumAlt = 2;
    expect(sumLocations.length).toEqual(sumAlt);

    expect(sumLocations[0]).toContainHTML('https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
    expect(sumLocations[1]).toContainHTML('https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon da página de detalhes.', () => {
    const { history, getByRole, getByText, container } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Fire/i));
    fireEvent.click(getByRole('link', { name: /More details/i }));
    const URL = '/pokemons/4';
    expect(history.location.pathname).toBe(URL);

    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    const star = container.querySelector('.favorite-icon');
    expect(star).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(star).not.toBeInTheDocument();
  });
});
