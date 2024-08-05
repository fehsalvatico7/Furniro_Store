import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Cabecalho from './images/CabecalhoShop.png';
import './Shop.css';
import productsData from './data/_database.json';
import Imagem from './images/footer.png';
import { CartContext } from '../Cart/CartContext'; 

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

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 16;
  const navigate = useNavigate();
  
  const cartContext = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('Default');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const productArray: Product[] = (productsData as ProductsData).products;
    setProducts(productArray);
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (cartContext) {
      cartContext.addProductToCart({
        id: product.id,
        title: product.title,
        price: product.salePrice,
        image: product.images.mainImage
      });

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000); 
    } else {
      console.error('CartContext is not available');
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.floor(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleGoToPage = (page: number) => {
    if (page >= 0 && page <= Math.floor(products.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const chunkProducts = (products: Product[], chunkSize: number): Product[][] => {
    const result: Product[][] = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      result.push(products.slice(i, i + chunkSize));
    }
    return result;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice === null || product.salePrice >= minPrice;
    const matchesMaxPrice = maxPrice === null || product.salePrice <= maxPrice;

    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'Price: Low to High') {
      return a.salePrice - b.salePrice;
    } else if (sortOption === 'Price: High to Low') {
      return b.salePrice - a.salePrice;
    } else {
      return 0;
    }
  });

  const currentProducts = sortedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const productRows = chunkProducts(currentProducts, 4);

  return (
    <div className= 'main'>
      <Header />
      <img src={Cabecalho} alt="shop" className='shop' />
      <div className='divLonga'>
        <span className='leftText'>Filter :: | Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results</span>
        <div className='inputs'>
          <input type="text" placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <span className='rightPlaceholder'>Min Price</span>
          <input type="number" placeholder='Min' value={minPrice !== null ? minPrice : ''} onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : null)} />
          <span className='rightPlaceholder'>Max Price</span>
          <input type="number" placeholder='Max' value={maxPrice !== null ? maxPrice : ''} onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)} />
          <span className='rightPlaceholder'>Sort By</span>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="Default">Default</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-message">
          Produto adicionado ao carrinho!
        </div>
      )}

      <div className="product-grid">
        {productRows.map((row, index) => (
          <div className="product-row" key={index}>
            {row.map(product => (
              <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
                {product.discountPercentage > 0 && (
                  <div className="discount-badge">
                    {`-${(product.discountPercentage * 100).toFixed(0)}%`}
                  </div>
                )}
                <img src={product.images.mainImage} alt={product.title} />
                <h2>{product.tags[0]}</h2>
                <p  className='tag'>{product.title}</p>
                <p className='preco'>Rp <strong>{product.salePrice.toFixed(2)} </strong>
                {product.discountPercentage > 0 && (
                  <span className='antigo'>Rp {product.normalPrice.toFixed(2)}</span>
                )}</p>
                <button onClick={(e) => handleAddToCart(product, e)} className="add-to-cart-button">Add to Cart</button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="pagination-buttons">
        {[...Array(Math.ceil(sortedProducts.length / itemsPerPage)).keys()].map(page => (
          <button key={page} onClick={() => handleGoToPage(page)}>{page + 1}</button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage >= Math.floor(sortedProducts.length / itemsPerPage)}>Next</button>
      </div>

      <img src={Imagem} alt="img" className='imgFooter' />
      <Footer />
    </div>
  );
}

export default Shop;
