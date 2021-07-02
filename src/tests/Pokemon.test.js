import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemonOverview = '.pokemon-overview';
  const moreDetails = 'More details';
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(moreDetails);
    fireEvent.click(btnMoreDetails);
    const nameInDetails = container.querySelector(pokemonOverview).firstChild;
    const typeInDetails = container.querySelector(pokemonOverview).firstChild.nextSibling;
    const weightInDetails = container.querySelector(pokemonOverview).lastChild;
    const imgInDetails = container.querySelector('img');
    expect(nameInDetails.textContent).toBe('Pikachu');
    expect(typeInDetails.textContent).toBe('Electric');
    expect(weightInDetails.textContent).toBe('Average weight: 6.0 kg');
    expect(imgInDetails.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgInDetails.alt).toBe('Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(moreDetails);
    fireEvent.click(btnMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(moreDetails);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(btnMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Reste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(moreDetails);
    fireEvent.click(btnMoreDetails);
    let favoriteImage = container.querySelector('.favorite-icon');
    expect(favoriteImage).not.toBeInTheDocument();
    const inputFavorite = getByText('Pokémon favoritado?');
    fireEvent.click(inputFavorite);
    favoriteImage = container.querySelector('.favorite-icon');
    expect(favoriteImage).toBeInTheDocument();
    expect(favoriteImage.src).toContain('/star-icon.svg');
    expect(favoriteImage.alt).toBe('Pikachu is marked as favorite');
  });
});
