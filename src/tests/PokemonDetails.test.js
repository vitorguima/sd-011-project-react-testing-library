import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(`Teste se é renderizado um card com as informações 
  de determinado pokémon.`, () => {
  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const pkmDetailsTitle = getByText('Pikachu Details');
    const pkmDetailsName = getByText('Pikachu');
    expect(pkmDetailsTitle).toBeInTheDocument();
    expect(pkmDetailsName).toBeInTheDocument();
  });

  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const pkmDetailsType = getByTestId('pokemon-type');
    expect(pkmDetailsType.textContent).toBe('Electric');
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const detailsH2 = getByRole('heading', { level: 2, name: 'Summary' });
    expect(detailsH2).toBeInTheDocument();
  });

  test(`A seção de detalhes deve conter um parágrafo com o resumo do 
    Pokémon específico sendo visualizado`, () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const part1 = 'This intelligent Pokémon roasts hard berries with';
    const part2 = 'electricity to make them tender enough to eat.';
    const detailsJoin = getByText(`${part1} ${part2}`);
    expect(detailsJoin).toBeInTheDocument();
  });
});
describe(`Teste se existe na página uma seção com os mapas contendo 
  as localizações do pokémon`, () => {
  test(`Na seção de detalhes deverá existir um heading h2 com o texto 
    Game Locations of <name>`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const locationH2 = getByRole(
      'heading', { level: 2, name: 'Game Locations of Pikachu' },
    );
    expect(locationH2).toBeInTheDocument();
  });

  test(`Devem ser exibidos, o nome da localização e uma imagem do mapa 
    em cada localização;`, () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const altpkmLocation = getAllByAltText('Pikachu location');
    const Map0 = 'Kanto Viridian Forest';
    expect(altpkmLocation.length > 0).toBeTruthy();
    expect(altpkmLocation[0].nextElementSibling.textContent)
      .toBe(Map0);
    const imgURL = ('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(altpkmLocation[0].src).toBe(imgURL);
    expect(altpkmLocation[0].alt).toBe('Pikachu location');
  });
});

describe(`Teste se o usuário pode favoritar um pokémon através da página 
  de detalhes.`, () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const checkboxText = getByLabelText(/Pokémon favoritado?/i);
    expect(checkboxText).toBeInTheDocument();
  });

  test(`Cliques alternados no checkbox devem adicionar e remover 
    respectivamente o Pokémon da lista de favoritos;`, () => {
    const { getByLabelText, getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    const checkboxText = getByLabelText(/Pokémon favoritado?/i);
    expect(checkboxText).not.toBeChecked();
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    expect(checkboxText).toBeChecked();
    const imgUrl = ('http://localhost/star-icon.svg');
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img.src).toBe(imgUrl);
  });
});
