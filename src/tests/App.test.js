import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Requisito 01', () => {
  it('Renderiza Pokedéx ao carregar a aplicação no caminho de URL `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se o topo da aplicação contém um conjunto de links de navegação.', () => {

  });

  it('Redireciona para a página inicial, ao clicar no link Home', () => {

  });

  it('Redireciona para a página de About, na URL /about, ao clicar no link About', () => {

  });

  it('Redireciona para a página de Favoritos ao clicar no link Favorite Pokémons', () => {

  });
  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {

  });
});
