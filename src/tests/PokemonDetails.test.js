import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const detail = 'More details';

test('Verifica se tem o Summary renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[1];
  expect(getAbout.textContent).toBe('Summary');
});

test('Verifica se tem o Game Locations of<Name> renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[2];
  expect(getAbout.textContent).toBe('Game Locations of Pikachu');
});

test('Verifica se tem o Pikachu Details renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(detail);
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[0];
  expect(getAbout.textContent).toBe('Pikachu Details');
});

test('Verifica se details não é renderizado no pagina details', () => {
  const { getByText } = renderWithRouter(<App />);
  const details = getByText('More details');
  fireEvent.click(details);
  expect(details).not.toBeInTheDocument();
});
