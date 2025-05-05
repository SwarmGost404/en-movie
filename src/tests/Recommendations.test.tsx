import { render, screen, cleanup } from '@testing-library/react';
import Recommendations from '../components/pages/Recommendations';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';


describe('Home Component', () => {
  beforeAll(() => {
    global.TextEncoder = require('util').TextEncoder;
    global.TextDecoder = require('util').TextDecoder;
  });
  afterEach(() => {
    cleanup();
  })

  test('renders without crashing Home', () => {
    render(
      <BrowserRouter>
        <Recommendations />
      </BrowserRouter>
    )

    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent('Укажите свой уровень английского:');
  });

});