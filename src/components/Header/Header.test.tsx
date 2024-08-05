import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders logo image', () => {
    render(<Header />);
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Header />);
    const homeButton = screen.getByText('Home');
    const shopButton = screen.getByText('Shop');
    const aboutButton = screen.getByText('About');
    const contactButton = screen.getByText('Contact');

    expect(homeButton).toBeInTheDocument();
    expect(shopButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });

  test('renders icon buttons', () => {
    render(<Header />);
    const iconButtons = screen.getAllByRole('button');
    expect(iconButtons.length).toBe(6); 
   
    const icon1 = screen.getAllByAltText('icone')[0];
    const icon2 = screen.getAllByAltText('icone')[1];

    expect(icon1).toBeInTheDocument();
    expect(icon2).toBeInTheDocument();
  });
});
