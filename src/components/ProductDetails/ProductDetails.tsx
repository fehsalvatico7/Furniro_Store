import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from './data/_database.json';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './ProductDetails.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


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

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="star-icon" />)}
      {hasHalfStar && <FaStarHalfAlt className="star-icon" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="star-icon" />)}
    </div>
  );
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productArray: Product[] = (productsData as ProductsData).products;
  const product = productArray.find(p => p.id === Number(id));

  const [mainImage, setMainImage] = useState(product?.images.mainImage || '');
  

  const relatedProducts = productArray.filter(p => p.id !== Number(id)).slice(0, 4);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div>
      <Header/>
      <div className="product-details-container">
        <div className='product-image'>
          <img src={mainImage} alt={product.title} />
          <div className="product-gallery">
            <div className="gallery-thumbnails">
              {product.images.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} thumbnail ${index}`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className='textCinza'>Rp<strong></strong> {product.salePrice.toFixed(2)}</p>
          <div className="rating-container">
            {renderStars(product.rating)}
          </div>
          <p>{product.description.short}</p><br />
          <p className='textCinza'>Size</p>
          <div className='btns'>
            <button>L</button>
            <button>XL</button>
            <button>XS</button>
          </div>
          <p className='textCinza'>Color</p>
          <button className='roxo'></button>
          <button className='preto'></button>
          <button className='amarelo'></button><br />
          <div><br /><br />
         <input className='input1' type="number" placeholder="1" min="1" max="100" step="1" />   
         <button className='addBtn'>Add To Card</button>
        </div>
        </div>
        
      </div><br /><br />
      <h2 className='desc'>Description</h2> 
      <p className='descrip'>{product.description.long}</p>
      <div className="image-gallery">
        {product.images.gallery.slice(0, 2).map((img, index) => (
          <img key={index} src={img} alt={`${product.title} ${index}`} />
        ))}
      </div>

      <div className='products'>
        <h2 className='relat'>Related Products</h2>
        <div className="product-grid">
          {relatedProducts.map(prod => (
            <div className="product-card" key={prod.id}>
              <img src={prod.images.mainImage} alt={prod.title} />
              <h2>{prod.tags[0]}</h2>
              <p>{prod.title}</p>
              <p><strong>{prod.salePrice.toFixed(2)} Rp</strong></p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <button className='show'>Show More</button>
      <Footer/>
    </div>
  );
};

export default ProductDetails;
