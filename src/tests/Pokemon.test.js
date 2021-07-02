import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

test('Test renders card Pokemon information', () => {
  const { averageWeight: { value, measurementUnit } } = data[0];
  const { getByText, getAllByText, getByRole } = renderWithRouter(<App />);
  expect(getByText(data[0].name)).toBeInTheDocument();
  expect(getAllByText(data[0].type)[0]).toBeInTheDocument();
  expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  const support = getByRole('img', { name: `${data[0].name} sprite` });
  expect(support).toHaveAttribute('src', data[0].image);
  expect(support.alt).toContain(`${data[0].name} sprite`);
});
test('Test pokemon link ok', () => {
  const { getByRole } = renderWithRouter(<App />);
  const support = getByRole('link', { name: 'More details' });
  expect(support).toHaveAttribute('href', `/pokemons/${data[0].id}`);
});
test('Teste link páginda detalhes ok', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  fireEvent.click(getByRole('link', { name: /More details/i }));
  expect(history.location.pathname).toBe(`/pokemons/${data[0].id}`);
});
test('Test star icon on favorite Pokemons', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  fireEvent.click(getByRole('link', { name: /More details/i }));
  expect(getByTestId(/pokemon-type/i).innerHTML).toBe('Electric');
  fireEvent.click(getByRole('checkbox'));
  const support = getByRole('img', { name: `${data[0].name} is marked as favorite` });
  expect(support).toHaveAttribute('src', '/star-icon.svg');
});
