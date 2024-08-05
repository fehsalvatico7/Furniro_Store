import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import ImageHome from './images/imageHome.png';
import './Home.css'; 
import Dining from './images/dining.png';
import Living from './images/living.png';
import Bedron from './images/bedron.png';
import productsData from './data/_database.json';
import Footer from '../Footer/Footer';
import Carousel from '../Carousel/Carousel';
import ImageMoveis from './images/imagemMoveis.jpg';

interface Color {
  name: string;
  hex: string;
}

interface Image {
  mainImage: string;
  gallery: string[];
}

interface Product {
  id: number;
  sku: string;
  title: string;
  category: string;
  tags: string[];
  normalPrice: number;
  salePrice: number;
  discountPercentage: number;
  new: boolean;
  description: {
    short: string;
    long: string;
  };
  colors: Color[];
  sizes: string[];
  rating: number;
  images: Image;
}

interface ProductsData {
  products: Product[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productArray: Product[] = (productsData as ProductsData).products;
    setProducts(getRandomProducts(productArray, 8)); 
  }, []);

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleProductClick = (product: Product) => {
    console.log('Produto clicado:', product);
  };

  const handleShowMoreClick = () => {
    navigate('/shop');
  };

  const chunkProducts = (products: Product[], chunkSize: number): Product[][] => {
    const result: Product[][] = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      result.push(products.slice(i, i + chunkSize));
    }
    return result;
  };

  const productRows = chunkProducts(products, 4);

  return (
    <div><div className='principal'>
      <Header />
      <div className='containerHome'>
        <img src={ImageHome} alt="imgHome" className="imgHome" />
        <div className="rightContainer">
          <h3>New Arrival</h3>
          <h1>Discover Our <br />New Collection</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut <br />elit tellus, luctus nec ullamcorper mattis</p><br />
          <button className='buyBtn'>BUY NOW</button>
        </div>
      </div>
      <h1 className='browse'>Browse The Range</h1>
      <p className='lorem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><br /><br />
      <div className='containerBtn'>
        <button><img src={Dining} alt="Dining" className='iconImg' />Dining </button>
        <button><img src={Living} alt="Living" className='iconImg' />Living </button>
        <button><img src={Bedron} alt="Bedron" className='iconImg' />Bedron </button>
      </div>

      <h1 className='our'>Our Products</h1>
      <div className="product-grid">
        {productRows.map((row, index) => (
          <div className="product-row" key={index}>
            {row.map(product => (
              <ProductCard key={product.id} product={product} onClick={handleProductClick} />
            ))}
          </div>
        ))} 
        
      </div>
      <button className='showMore' onClick={handleShowMoreClick}>Show More</button>

      <div className="custom-container">
        <div className="subcontainer1">
          <h1>50+ Beautiful rooms <br />inspiration</h1>
          <p className='our2'>Our designer already made a lot of beautiful <br />prototipe of rooms that inspire you</p>
          <button className='sub1btn'>Explore More</button>
        </div>
        <div className="subcontainer2"><Carousel/></div>
      </div>
      <p className='share'>Share your setup with</p>
      <div className='images'>
        <h1 className='funiro'>#FuniroFurniture</h1>
        <img src={ImageMoveis} alt="imagens dos moveis" className="responsive-image" />
      </div>
      <Footer/>
    </div>
    </div>
  );
}

const ProductCard: React.FC<{ product: Product; onClick: (product: Product) => void }> = ({ product, onClick }) => (
  <div className="product-card" onClick={() => onClick(product)}>
    <img src={product.images.mainImage} alt={product.title} />
    <h2>{product.tags[0]}</h2> 
    <p className='titleProd'>{product.title}</p>
    <p className='price'>
      <span className='sale-price'>Rp {product.salePrice.toFixed(2)}</span>
      <span className='normal-price'>Rp {product.normalPrice.toFixed(2)}</span>
    </p>
    <div className="discount-badge">
      -{Math.round(product.discountPercentage * 100)}% 
    </div>
    <button className="add-to-cart-button">Add to Cart</button>
  </div>
);



export default Home;
