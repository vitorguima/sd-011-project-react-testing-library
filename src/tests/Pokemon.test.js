import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('6- Test <Pokemon.js /> component', () => {
  it('Should render a card with Pokemon informatios', () => {
    const { getByTestId, getByText, getByAltText } = renderWithRouter(<App />);
    const pkmName = getByTestId('pokemon-name');
    const pkmType = getByTestId('pokemon-type');
    const pkmWeigth = getByTestId('pokemon-weight');
    const pkmImage = getByAltText('Pikachu sprite');
    console.log(pkmImage.src);

    pokemons.forEach((pokemon) => {
      expect(pkmName).toHaveTextContent(pokemon.name);
      expect(pkmType).toHaveTextContent(pokemon.type);
      expect(pkmWeigth).toHaveTextContent(`Average weight: ${pokemon
        .averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
      expect(pkmImage).toHaveAttribute('src', pokemon.image);

      const nextBtn = getByText('Próximo pokémon');
      fireEvent.click(nextBtn);
    });
  });

  it('Should render a link to Pokemon details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const detailsBtn = getByText('More details');
    const btnAll = getByText('All');

    fireEvent.click(btnAll);
    expect(detailsBtn).toBeInTheDocument();

    fireEvent.click(detailsBtn);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Should have a star into Pokemon card when marked with favorite ', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const detailsBtn = getByText('More details');

    fireEvent.click(detailsBtn);
    const chkFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(chkFavorite);

    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
