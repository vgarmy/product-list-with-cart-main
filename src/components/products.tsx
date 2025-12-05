
import productsData from '../../data.json'; // adjust path
import './products.css';
import cart from '../assets/images/icon-add-to-cart.svg'

function Products() {
    return (
        <>
            <div className="grid grid-cols-3 gap-[20px]">
                {/* Left: 2/3 */}
                <div className="col-span-2">
                    <h1 className="text-3xl font-bold mb-4">Desserts</h1>
                    {/* Map over JSON */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[26px] gap-y-[40px]">
                        {productsData.map((product) => (
                            <div key={product.name} className='flex flex-col gap-1'>
                                <div className="w-full">
                                    <img
                                        className="w-full rounded-xl"
                                        src={`${import.meta.env.BASE_URL}${product.image.thumbnail}`}
                                        alt={product.name}
                                    />
                                    <div className="flex justify-center -mt-6">
                                        <button
                                            className="inline-flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-full px-6 py-2 shadow-md border border-[var(--Rose-300)] bg-[var(--Rose-50)] hover:border-[var(--Red)] hover:text-[var(--Red)] pointer"
                                            type="button"
                                        >
                                            <img src={cart} alt="Cart" className="w-5 h-5" />
                                            <span>Add to cart</span>
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-[var(--Rose-500)] mt-10">{product.category}</h3>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-[var(--Red)] font-bold">${product.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right: 1/3 */}
                <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
                    Sidebar or whatever you need
                </div>
            </div>
        </>
    );
}

export default Products;
