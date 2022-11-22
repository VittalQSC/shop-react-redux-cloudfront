import { Product } from "~/models/Product";

export type CartItem = {
  product_id: string | undefined;
  count: number;
};

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface ProductCartItem {
  product: Product;
  count: number;
}

export interface ProductCart {
  id: string;
  items: ProductCartItem[];
}
