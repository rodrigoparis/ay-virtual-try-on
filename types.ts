export interface Product {
  id: string;
  name: string;
  category: 'Running Shoes' | 'Accessories' | "Men's Pants" | "Men's Hoodie";
  price: number;
  prompt: string;
  image: string;
}