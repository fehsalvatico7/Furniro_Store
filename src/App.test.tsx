
import React from 'react';
import { render, screen,} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


jest.mock('./components/Home/Home', () => () => <div>Home Component</div>);
jest.mock('./components/Shop/Shop', () => () => <div>Shop Component</div>);
jest.mock('./components/ProductDetails/ProductDetails', () => () => <div>Product Details Component</div>);
jest.mock('./components/Cart/Cart', () => () => <div>Cart Component</div>);
jest.mock('./components/PageCart/PageCart', () => () => <div>Page Cart Component</div>);
jest.mock('./components/Checkout/Checkout', () => () => <div>Checkout Component</div>);
jest.mock('./components/Contact/Contact', () => () => <div>Contact Component</div>);
jest.mock('./components/Login/Login', () => () => <div>Login Component</div>);
jest.mock('./components/Login/Register', () => () => <div>Register Component</div>);
jest.mock('./components/Login/PrivateRoute', () => () => <div>Private Route Component</div>);

describe('App Component', () => {
  test('renders Home and other routes', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    
    expect(screen.getByText(/Home Component/i)).toBeInTheDocument();

  
    expect(screen.getByText(/Shop Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Product Details Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Cart Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Page Cart Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Checkout Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Contact Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Login Component/i)).toBeInTheDocument();

    expect(screen.getByText(/Register Component/i)).toBeInTheDocument();
  });

});
