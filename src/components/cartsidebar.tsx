
import './products.css';
import cart from '/assets/images/illustration-empty-cart.svg'

function Cartsidebar() {
    return (
        <>
            <div className='bg-white p-5 rounded-lg flex flex-col gap-5'>
                <p className='text-2xl font-bold text-[var(--Red)]'>Your Cart (0)</p>
                <img src={cart} className='mx-auto' />
                <p className='mx-auto text-sm mb-4'>Your added items will appear here</p>
            </div>
        </>
    );
}

export default Cartsidebar;
