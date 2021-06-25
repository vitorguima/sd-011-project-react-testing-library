import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testes do componente About.js', () => {
  test('Testa se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId, getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pkmHomeName = getByTestId('pokemon-name');
    const pkmHomeType = getByTestId('pokemon-type');
    const pkmHomeWght = getByTestId('pokemon-weight');
    const ImgURL = ('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const img = getByAltText('Pikachu sprite');
    expect(pkmHomeName.textContent).toBe('Pikachu');
    expect(pkmHomeType.textContent).toBe('Electric');
    expect(pkmHomeWght.textContent).toBe('Average weight: 6.0 kg');
    expect(img.src).toBe(ImgURL);
  });
  test(`O card do Pokémon indicado na Pokédex contém um link de navegação 
    para exibir detalhes deste Pokémon.`, () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pkmLinkDetails = getByText(/More Details/i);
    expect(pkmLinkDetails).toBeInTheDocument();
  });
  test(`Testa se ao clicar no link de navegação do Pokémon, é feito o 
    redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const detailsPath = history.location.pathname;
    const path = '/pokemons/25';
    expect(detailsPath).toBe(path);
    const pkmDetais = getByText(/Pikachu Details/i);
    expect(pkmDetais).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/home/i));
    const imgUrl = ('http://localhost/star-icon.svg');
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img.src).toBe(imgUrl);
  });
});
