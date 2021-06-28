import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByRole } = render(<About />);
    const subtitle = getByRole('heading', { level: 2 });
    expect(subtitle).toHaveTextContent(/About Pokédex/i);
  });
});
