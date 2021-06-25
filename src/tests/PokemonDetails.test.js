import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const moreDetails = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  test('testa  card com as informações de determinado pokémon.', () => {
    const { getByText, queryByText, getAllByRole, container } = renderWithRouter(<App />);
    const PokemonSelected = Data[0];
    const {
      name,
      summary,
    } = PokemonSelected;
    fireEvent.click(getByText(moreDetails));
    const TitlePokemon = getByText(`${name} Details`);
    expect(TitlePokemon).toBeInTheDocument();
    expect(queryByText(moreDetails)).not.toBeInTheDocument();
    const Header = getAllByRole('heading')[2];
    expect(Header.textContent).toBe('Summary');
    const Paragraph = container.querySelectorAll('p')[3];
    expect(Paragraph).toBeInTheDocument();
    expect(Paragraph.textContent).toBe(summary);
  });

  test('testa a seção de mapas', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const PokemonSelected = Data[0];
    const {
      foundAt,
      name,
    } = PokemonSelected;
    fireEvent.click(getByText(moreDetails));
    const HeaderMap = container.querySelectorAll('h2')[2];
    const Images = container.querySelectorAll('img');
    expect(HeaderMap.textContent).toBe(`Game Locations of ${name}`);
    foundAt.forEach(({ location, map }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(Images[index + 1].src).toBe(map);
      expect(Images[index + 1].alt).toBe(`${name} location`);
    });
  });
  test('Teste se o usuário pode favoritar um pokémon ', () => {
    const { getByText, container, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const Checkbox = getByLabelText('Pokémon favoritado?');
    expect(Checkbox).toBeInTheDocument();
    fireEvent.click(Checkbox);
    const imgFavorite = container.querySelectorAll('img')[1];
    expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
    fireEvent.click(Checkbox);
    const imgFavorite2 = container.querySelectorAll('img')[1];
    expect(imgFavorite2.src).not.toBe('http://localhost/star-icon.svg');
  });
});
