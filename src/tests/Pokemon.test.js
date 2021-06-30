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
    const snorlax = getByTestId(/pokemon-name/);
    expect(snorlax).toBeInTheDocument();
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

  test('se existe um ícone de estrela nos Pokémons favoritadoso', () => {
    const { getByText, history } = renderWithRouter(<App />);
    // localiza o botão0
    const normaltype = getByText(/Normal/);
    // clica no mesmo
    fireEvent.click(normaltype);
    // localiza o botão de detalhes
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemoĩkns/143');
    const details = getByText(/Snorlax Details/);
    expect(details).toBeInTheDocument();
  });
});
