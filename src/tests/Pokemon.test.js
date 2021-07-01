import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
// import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/);
    // clica no mesmo
    fireEvent.click(normaltype);
    const name = getByText(/Snorlax/);
    expect(name).toBeInTheDocument();
    const snorlax = getByTestId(/pokemon-name/);
    expect(snorlax).toBeInTheDocument();
    expect(normaltype).toBeInTheDocument();
    const type = getAllByTestId(/pokemon-type/)[0];
    expect(type).toBeInTheDocument();
    const weight = getByTestId(/pokemon-weight/);
    expect(weight).toBeInTheDocument();
  });

  test('se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/);
    expect(moreDetails).toBeInTheDocument();
  });

  test('se ao clicar no link é redirecionado para a página de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/143');
    const details = getByText(/Snorlax Details/);
    expect(details).toBeInTheDocument();
  });

  test('se a URL muda pra /pokemon/<id>, id sendo do Pokémon cujos se deseja ver', () => {
    const { getByText, history } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/143');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByAltText, getByRole } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/i);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    // marca como favorito
    const checkbox = getByRole(/checkbox/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    // localiza a estrela de favorito
    const favoritePokemon = getByAltText(/Snorlax is marked as favorite/i);
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon.src).toContain('/star-icon.svg');
  });

  test('se aparece a imagem do pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/i);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    // verifica a presença da imagem pelo alt
    const image = getByAltText(/Snorlax sprite/);
    expect(image).toBeInTheDocument();
  });

  test('se aparece a imagem do pokemon a partir do src', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/i);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    // verifica o src pelo alt
    const image = getByAltText(/Snorlax sprite/);
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  });

  test('se aparece o Average weight', () => {
    const { getByText } = renderWithRouter(<App />);
    // localiza o botão
    const normaltype = getByText(/Normal/i);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    // verifica o src pelo alt
    const AverageWeight = getByText(/Average weight: 460.0 kg/);
    expect(AverageWeight).toBeInTheDocument();
  });
});
