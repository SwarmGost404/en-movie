import { render, screen, cleanup } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';


describe('Header Component', () => {
  beforeAll(() => {
    global.TextEncoder = require('util').TextEncoder;
    global.TextDecoder = require('util').TextDecoder;
  });
  afterEach(() => {
      cleanup();
  })

  test('renders without crashing Header', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = screen.getByRole('banner')
    
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('EnEnglish');
  });
});