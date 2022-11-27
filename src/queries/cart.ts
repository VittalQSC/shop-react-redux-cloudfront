import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { Cart, CartItem, ProductCartItem } from "~/models/CartItem";
import { Product } from "~/models/Product";
import { useAvailableProducts } from "./products";

export function useCart() {
  return useQuery<CartItem[], AxiosError>("cart", async () => {
    const res = await axios.get<{ cart: Cart }>(
      `${API_PATHS.cart}/profile/cart`,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
    return res.data.cart.items;
  });
}

export function useProductsCart() {
  const { data } = useAvailableProducts();
  const products = data as Product[];

  return useQuery<ProductCartItem[], AxiosError>(
    ["cart-product", products],
    async () => {
      const res = await axios.get<{ cart: Cart }>(
        `${API_PATHS.cart}/profile/cart`,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem(
              "authorization_token"
            )}`,
          },
        }
      );
      const cartItems = res.data.cart.items.map(
        ({ count, product_id }) =>
          ({
            count,
            product: products?.find((p) => p.id === product_id),
          } as ProductCartItem)
      );

      return cartItems;
    },
    {
      enabled: products?.length > 0,
    }
  );
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(() => queryClient.invalidateQueries("cart"), []);
}

export function useUpsertCart() {
  return useMutation((values: CartItem[]) =>
    axios.put<Cart>(
      `${API_PATHS.cart}/profile/cart`,
      { id: null, items: values },
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    )
  );
}
