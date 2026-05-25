export interface ProductColor {
  name: string;
  hex: string;
  image: string; // Image showing this specific color
}

export interface Product {
  id: string;
  name: string;
  category: string; // "Sneakers" | "Running" | "Basketball" | "Casual" | "High Tops" | "Platform" | "Sports" | "Gym & Training" | "School" | "Limited" | "Lifestyle";
  gender: "Men" | "Women" | "Kids";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  image: string;
  images: string[]; // Alternate views
  colors: ProductColor[];
  sizes: number[];
  tags: string[];
  isNew?: boolean;
  isLimited?: boolean;
}

export interface CartItem {
  id: string; // Unique combination of product.id + selectedColor + selectedSize
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  date: string;
}
