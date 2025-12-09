import { useState } from 'react';
import productsData from '../../data.json';
import Cartsidebar from './cartsidebar';
import type { Product, CartItem } from './types';
import './products.css';
import cartIcon from '/assets/images/icon-add-to-cart.svg';

function Products() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product: Product) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const getCartItem = (product: Product) =>
    cartItems.find(item => item.name === product.name);

  return (
    <div className="grid grid-cols-3 gap-[20px]">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold mb-4">Desserts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[26px] gap-y-[40px]">
          {productsData.map(product => {
            const cartItem = getCartItem(product);
            return (
              <div key={product.name} className="flex flex-col gap-1">
                <div className="w-full">
                  <picture>
                    <source
                      media="(min-width:1024px)"
                      srcSet={`${import.meta.env.BASE_URL}${product.image.desktop}`}
                    />
                    <source
                      media="(min-width:640px)"
                      srcSet={`${import.meta.env.BASE_URL}${product.image.tablet}`}
                    />
                    <source
                      media="(max-width:639px)"
                      srcSet={`${import.meta.env.BASE_URL}${product.image.mobile}`}
                    />
                    <img
                      className="w-full rounded-xl"
                      src={`${import.meta.env.BASE_URL}${product.image.thumbnail}`}
                      alt={product.name}
                    />
                  </picture>
                  <div className="flex justify-center -mt-6 relative w-full">
                    <div className="relative w-[140px] h-[42px]">
                      <button
                        className={`absolute inset-0 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-full px-6 py-2 shadow-md border border-[var(--Rose-300)] bg-[var(--Rose-50)] hover:border-[var(--Red)] hover:text-[var(--Red)] transition-opacity duration-200 ${cartItem ? 'opacity-0 pointer-events-none' : 'opacity-100'
                          }`}
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        <img src={cartIcon} alt="Cart" className="w-5 h-5" />
                        <span>Add to cart</span>
                      </button>
                      <div
                        className={`absolute inset-0 inline-flex items-center justify-between gap-x-4 px-6 py-2 bg-[var(--Red)] text-white rounded-full shadow-md transition-opacity duration-200 ${cartItem ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                      >
                        <button
                          onClick={() => removeFromCart(product)}
                          className="w-4 h-4 p-[3px] rounded-full border border-[var(--Red)] bg-[var(--Red)] flex items-center justify-center cursor-pointer transition-colors duration-200 text-white hover:bg-white hover:text-[var(--Red)]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="2"
                            fill="currentColor"
                            viewBox="0 0 10 2"
                          >
                            <path d="M0 .375h10v1.25H0V.375Z" />
                          </svg>
                        </button>
                        <span>{cartItem?.quantity}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-4 h-4 p-[3px] rounded-full border border-[var(--Red)] bg-[var(--Red)] flex items-center justify-center cursor-pointer transition-colors duration-200 text-white hover:bg-white hover:text-[var(--Red)]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            viewBox="0 0 10 10"
                          >
                            <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-[var(--Rose-500)] mt-10 text-sm">{product.category}</h3>
                <p className="font-semibold">{product.name}</p>
                <p className="text-[var(--Red)] font-bold">${product.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-1">
        <Cartsidebar cartItems={cartItems} onRemove={(index) => setCartItems(prev => prev.filter((_, i) => i !== index))} />
      </div>
    </div>
  );
}

export default Products;