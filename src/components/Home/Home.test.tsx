// Home.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../Carousel/Carousel', () => () => <div>Carousel Component</div>);

describe('Home Component', () => {
  test('renders Home component and checks for text and images', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

   
    expect(screen.getByText(/Discover Our New Collection/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse The Range/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
    expect(screen.getByText(/50+ Beautiful rooms inspiration/i)).toBeInTheDocument();
    expect(screen.getByText(/Share your setup with/i)).toBeInTheDocument();
    expect(screen.getByAltText(/imagens dos moveis/i)).toBeInTheDocument();
    

    expect(screen.getByRole('button', { name: /BUY NOW/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show More/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore More/i })).toBeInTheDocument();
  });

  test('clicking Show More button navigates to /shop', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /Show More/i }));
    

    expect(navigate).toHaveBeenCalledWith('/shop');
  });

});
