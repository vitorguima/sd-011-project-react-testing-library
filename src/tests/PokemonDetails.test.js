import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('testes componente PokemonDetails', () => {
  test('teste se as informações detalhadas são mostradas na tela', () => {
    const pikachu = pokemons[0];
    const { getByText, queryByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const pikachuDetails = getByText(`${pikachu.name} Details`);
    expect(pikachuDetails).toBeInTheDocument();
    const detailsLink = queryByText('More details');
    expect(detailsLink).not.toBeInTheDocument();
    const h2 = container.querySelectorAll('h2');
    expect(h2[1].textContent).toBe('Summary');
    const p = container.querySelectorAll('p');
    expect(p[3].textContent).toBe(pikachu.summary);
  });

  test('teste se existe uma seção com os mapas contendo as loc', () => {
    const pikachu = pokemons[0];
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const h2 = container.querySelectorAll('h2');
    expect(h2[2].textContent).toBe(`Game Locations of ${pikachu.name}`);
    const locImg1 = container.querySelectorAll('img')[1];
    const locImg2 = container.querySelectorAll('img')[2];
    const dataMap = pikachu.foundAt.map(({ map }) => map);
    expect(locImg1.src).toBe(dataMap[0]);
    expect(locImg2.src).toBe(dataMap[1]);
    expect(locImg1.alt).toBe(`${pikachu.name} location`);
    expect(locImg2.alt).toBe(`${pikachu.name} location`);
    const dataLoc = pikachu.foundAt.map(({ location }) => location);
    const locName1 = container.querySelectorAll('p')[4];
    const locName2 = container.querySelectorAll('p')[5];
    expect(locName1.textContent).toBe(dataLoc[0]);
    expect(locName2.textContent).toBe(dataLoc[1]);
  });

  test('teste se o usuario pode favoritar e desfavoritar o pokemon', () => {
    const { getByText,
      getByRole, getAllByRole, getByLabelText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favoriteCheck = getByRole('checkbox');
    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    console.log(favoriteLabel.innerHTML);
    expect(favoriteCheck).toBeInTheDocument();
    fireEvent.click(favoriteCheck);
    const starImg = getAllByRole('img')[1];
    expect(starImg.src).toContain('/star-icon.svg');
    fireEvent.click(favoriteCheck);
    expect(starImg).not.toBeInTheDocument();
  });
});
