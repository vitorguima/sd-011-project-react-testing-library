import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';
import data from '../data';

const pokemon = data[0];
const { name, summary, foundAt } = pokemon;
describe('Pokemon Details tests', () => {
  const moreDetailsText = 'More details';
  test('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const {
      getByText,
      queryByText,
      getAllByRole,
      container } = renderWithRouter(<App />);
    fireEvent.click(getByText(moreDetailsText));
    expect(getByText(`${name} Details`));
    expect(queryByText(moreDetailsText)).not.toBeInTheDocument();
    expect(getAllByRole('heading')[2].textContent).toBe('Summary');
    expect(container.querySelectorAll('p')[3].textContent).toBe(summary);
  });

  test('Teste se existe na pág uma seção com os mapas contendo as localizações', () => {
    const {
      getByText,
      getAllByRole,
      container } = renderWithRouter(<App />);
    fireEvent.click(getByText(moreDetailsText));
    expect(getAllByRole('heading')[3].textContent).toBe(`Game Locations of ${name}`);
    const containerMaps = container.querySelector('.pokemon-habitat').childNodes;
    foundAt.forEach(({ location, map }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      const img = containerMaps[index].firstChild;
      expect(img.src).toBe(map);
      expect(img.alt).toBe(`${name} location`);
    });
  });

  test('Teste se o usuário pode favoritar um pokémon através da pág de detalhes', () => {
    const {
      getByLabelText,
      getByText,
      container } = renderWithRouter(<App />);
    fireEvent.click(getByText(moreDetailsText));
    const btnFavoritePokemon = getByLabelText('Pokémon favoritado?');
    expect(btnFavoritePokemon).toBeInTheDocument();
    const srcImg = 'http://localhost/star-icon.svg';
    expect(container.querySelectorAll('img')[1].src).not.toBe(srcImg);
    fireEvent.click(btnFavoritePokemon);
    expect(container.querySelectorAll('img')[1].src).toBe(srcImg);
    fireEvent.click(btnFavoritePokemon);
    expect(container.querySelectorAll('img')[1].src).not.toBe(srcImg);
  });
});
