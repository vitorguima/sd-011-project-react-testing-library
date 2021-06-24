import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithMemory = (component, props) => {
  return render(<MemoryRouter { ...props } >{component}</MemoryRouter>)
};

export default renderWithMemory;