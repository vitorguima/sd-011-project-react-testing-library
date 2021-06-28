import React from 'react';
// import { MemoryRouter } from "react-router-dom";
// import { render, fireEvent } from "@testing-library/react";
import App from '../App';
import renderWithRouter from '../renderWithRouter';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

// test('shows the Pokédex when the route is `/`', () => {
//   const { getByText } = render(
//     <MemoryRouter initialEntries={ ['/'] }>
//       <App />
//     </MemoryRouter>,
//   );

//   expect(getByText('Encountered pokémons')).toBeInTheDocument();
// });

describe('Requisito 1 - componente App', () => {
  test('Se a página principal da Pokédex é renderizada ao carregar a aplicação', () => {
    const { getByText } = renderWithRouter(<App />);
    const app = getByText(/Encountered pokémons/i);
    expect(app).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/home/i);
    expect(link).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/about/i);
    expect(link).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/Favorite Pokémons/i);
    expect(link).toBeInTheDocument();
  });
});
