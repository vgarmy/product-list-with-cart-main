import React from 'react';
import './products.css';
import emptyCart from '/assets/images/illustration-empty-cart.svg';
import remove from '/assets/images/icon-remove-item.svg';
import carbon from '/assets/images/icon-carbon-neutral.svg';
import type { CartItem } from './types';

interface CartsidebarProps {
  cartItems: CartItem[];
  onRemove: (index: number) => void;
}

const Cartsidebar: React.FC<CartsidebarProps> = ({ cartItems, onRemove }) => {
  return (
    <div className='bg-white p-5 rounded-lg flex flex-col gap-5'>
      <p className='text-2xl font-bold text-[var(--Red)]'>
        Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </p>

      {cartItems.length === 0 ? (
        <>
          <img src={emptyCart} className='mx-auto' />
          <p className='mx-auto text-sm mb-4'>Your added items will appear here</p>
        </>
      ) : (
        <div className='flex flex-col gap-2'>
          {cartItems.map((item: CartItem, index: number) => (
            <div key={index} className='flex flex-col'>
              <span className='font-bold text-sm mb-1'>{item.name}</span>
              <span className='flex flex-row justify-between'>
                <span className='flex flex-row gap-5'>
                  <span className='font-bold text-[var(--Red)] w-8'>{item.quantity}x</span>
                  <span className='text-[var(--Rose-500)]'>@ ${(item.price).toFixed(2)}</span>
                  <span className='font-bold text-[var(--Rose-400)]'>${(item.price * item.quantity).toFixed(2)}</span>
                </span>
                <span className="flex content-end">
                  <img
                    src={remove}
                    onClick={() => onRemove(index)}
                    className="w-4 h-4 p-[2px] rounded-full border border-[var(--Rose-400)] hover:border-black hover:brightness-0 cursor-pointer"
                    alt="Remove"
                  />
                </span>
              </span>
              <hr className="border-t-1 border-[var(--Rose-300)] mb-3 mt-4" />
            </div>
          ))}
          <div className='flex flex-row justify-between mb-3'>
            <span>Order Total</span>
            <span className='font-bold text-[var(--Rose-900)] text-2xl'>
              ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row w-full bg-[var(--Rose-50)] rounded-lg p-3 mb-4">
            <span className="flex items-center gap-1 mx-auto">
              <img src={carbon} />
              <span>This is a </span>
              <b>carbon-neutral</b>
              <span> delivery</span>
            </span>
          </div>
          <button className="w-full bg-[var(--Red)] text-[var(--Rose-50)] font-bold py-3 rounded-full text-center hover:bg-red-700 cursor-pointer">
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cartsidebar;