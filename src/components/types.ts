export type Product = {
  name: string;
  category: string;
  price: number;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    thumbnail: string;
  };
};

export type CartItem = Product & { quantity: number };