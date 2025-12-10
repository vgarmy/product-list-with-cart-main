import React, { useState } from 'react';
import './products.css';
import emptyCart from '/assets/images/illustration-empty-cart.svg';
import remove from '/assets/images/icon-remove-item.svg';
import carbon from '/assets/images/icon-carbon-neutral.svg';
import confirmed from '/assets/images/icon-order-confirmed.svg';
import type { CartItem } from './types';

interface CartsidebarProps {
  cartItems: CartItem[];
  onRemove: (index: number) => void;
  onReset: () => void; // new prop to reset the cart
}

const Cartsidebar: React.FC<CartsidebarProps> = ({ cartItems, onRemove, onReset }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmOrder = () => {
    if (cartItems.length > 0) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='bg-white p-5 rounded-lg flex flex-col gap-5 mt-10 sm:mt-0'>
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
          <button
            onClick={handleConfirmOrder}
            className="w-full bg-[var(--Red)] text-[var(--Rose-50)] font-bold py-3 rounded-full text-center hover:bg-red-700 cursor-pointer"
          >
            Confirm Order
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[100%] max-w-md">
            <div className='flex flex-col'>
              <img src={confirmed} className='h-10 w-10' />
              <h2 className="text-3xl font-bold mt-4 mb-1">Order Summary</h2>
              <p className='text-[var(--Rose-400)] text-sm font-semibold'>We hope you enjoy your food!</p>
            </div>
            <div className='flex flex-col rounded bg-[var(--Rose-100)] p-5 mt-5'>
              {cartItems.map((item, index) => (
                <>
                  <div key={index} className="flex flex-row items-center">
                    <img src={`${import.meta.env.BASE_URL}${item.image.thumbnail}`} className='w-12 h-12 rounded mr-4' />
                    <div className='flex flex-col items-center"'>
                      <div className='flex flex-col'>
                        <span className="text-sm font-semibold">{item.name}</span>
                      </div>
                      <div  className='flex flex-row gap-3'>
                        <span className="text-sm text-[var(--Red)] font-bold">{item.quantity}x</span>
                        <span className="text-sm text-[var(--Rose-500)] ">@ {(item.price).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className='text-sm font-semibold ml-auto'>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <hr className="border-t-1 border-[var(--Rose-300)] my-3" />
                </>
              ))}
              <div className="flex justify-between items-center text-[var(--Rose-900)] ">
                <span className='text-sm'>Order total</span>
                <span className='text-lg font-bold'>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
            </div>
            <button
               onClick={() => {
                handleCloseModal();  // hide modal
                onReset();           // reset cart
              }}    
              className="mt-4 w-full bg-[var(--Red)] text-white py-2 rounded-full hover:bg-red-700 cursor-pointer"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartsidebar;
