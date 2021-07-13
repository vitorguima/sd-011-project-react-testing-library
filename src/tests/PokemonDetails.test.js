import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/);
    fireEvent.click(detailsLink);
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    const title = getByText(`${pokemonName} Details`);
    expect(title).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const summaryText = getByText(/Summary/);
    expect(summaryText).toBeInTheDocument();
    const pokemonSummary = pokemons[0].summary;
    const pokemonSummaryText = getByText(pokemonSummary);
    expect(pokemonSummaryText).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas', () => {
    const { getByText, getByTestId, getAllByAltText } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/);
    fireEvent.click(detailsLink);
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    const mapHeading = getByText(`Game Locations of ${pokemonName}`);
    expect(mapHeading).toBeInTheDocument();
    const locationsLength = getAllByAltText(`${pokemonName} location`).length;
    const locationsCheck = getAllByAltText(`${pokemonName} location`)[0];
    const locationImageLink = pokemons[0].foundAt[0].map;
    expect(locationsLength).toBe(pokemons[0].foundAt.length);
    expect(locationsCheck).toHaveAttribute('src', locationImageLink);
    expect(locationsCheck).toHaveAttribute('alt', `${pokemonName} location`);
  });

  it('Testa se o usuário pode favoritar através da página de detalhes', () => {
    const { getByText,
      getByLabelText,
      getAllByRole,
      getByTestId,
      getByRole } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/);
    fireEvent.click(detailsLink);
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
    const favoriteBox = getByRole('checkbox');
    fireEvent.click(favoriteBox);
    const favoriteMessage = getAllByRole('img')[1];
    expect(favoriteMessage.alt).toContain(`${pokemonName} is marked as favorite`);
    fireEvent.click(favoriteBox);
    expect(favoriteMessage).not.toBeInTheDocument();
  });
});
