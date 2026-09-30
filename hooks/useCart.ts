import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "@/services/cartService";
import { Cart, CartItemProps } from "@/components/cart/CartItem";


export const cartKeys = {
  all: ["carts"] as const,
  cartCount: ["cart-count"] as const,
  store:['store'] as const,
  remove:['remove'] as const,
  updateQuantity: (id: number,quantity:number) => ["cart", id,quantity] as const,
  update: (id: number) => ["cart", id] as const,
}

export const useCart = ()=> {
    return useQuery({
    queryKey: cartKeys.all,
    queryFn:cartService.getCarts,
    staleTime:10*60*1000
});
}

export const useCartCount = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: cartService.getCarts,
    staleTime: 10 * 60 * 1000,
    select: (data) => {
      const total = data?.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
      console.log('SELECT RECOMPUTED:', total);
      return total;
    }
  })
    // select: (data) => {
    //   const total = data?.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
    //   console.log('SELECT RECOMPUTED:', total);
    //   return total;
    // }})
};

export const useStoreCart = ()=> {
  const queryClient = useQueryClient();

    return useMutation({
    mutationFn:({productId,quantity,imageId}:{productId:number,quantity:number,imageId:number})=>{
      localStorage.setItem('cartCount',JSON.stringify(quantity))
     return cartService.storeCart(productId,quantity,imageId)
    },
 
      onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });

    },
});
}


export function useUpdateQuantity() {
  const queryClient = useQueryClient();

   return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      cartService.updateQuantity(cartItemId, quantity),

    onMutate: async ({ cartItemId, quantity }) => {
      // Cancel in-flight refetches
      await queryClient.cancelQueries({ queryKey: ["carts"] });

      // Snapshot current cart
      const previousCart = queryClient.getQueryData<Cart>(["carts"]);
      console.log(previousCart,'previousCart')

      // Optimistically update just the quantity of the matching cart item
      // queryClient.setQueryData<Cart>(["carts"], (old) => {
      //  console.log(old,'upls')
      //   if (!old) return old;
      //   return {
      //     ...old,
      //    cart:{
      //        items: old.cart.items.map((item: CartItemProps) =>
      //       item.id === Number(cartItemId)
      //         ? { ...item, quantity } // only quantity changes, product stays intact
      //         : item
      //     ),
      //    },
      //    count: old.cart.items.reduce((sum, i) => sum + i.quantity, 0)

      //   };
       
      // });

     queryClient.setQueryData<Cart>(["carts"], (old) => {
    if (!old) return old;
    const items = old.cart.items.map((item: CartItemProps) =>
      item.id === cartItemId ? { ...item, quantity } : item
    );
    return { ...old, cart: { items } };
  });

      return { previousCart };
    },

    // Roll back if backend fails
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["carts"], context?.previousCart);
      // toast.error("Failed to update quantity");
    },

    // Always refetch to stay in sync with DB
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}
export function useRemoveItemFromCart() {
  const queryClient = useQueryClient();

   return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number}) =>
      cartService.removeItemFromCart(cartItemId),

    onMutate: async ({ cartItemId }) => {
      // Cancel in-flight refetches
      await queryClient.cancelQueries({ queryKey: ["carts"] });

      // Snapshot current cart
      const previousCart = queryClient.getQueryData<Cart>(["carts"]);
      console.log(previousCart,'previousCart')

      // Optimistically update just the quantity of the matching cart item
      queryClient.setQueryData<Cart>(["carts"], (old) => {
        console.log(old,'old')
        if (!old) return old;
        return {
          ...old,
         cart:{
             items: old.cart.items.filter((item: CartItemProps) =>item.id !== cartItemId),
         }
        };
       
      });

      return { previousCart };
    },

    // Roll back if backend fails
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["carts"], context?.previousCart);
      // toast.error("Failed to update quantity");
    },

    onSuccess:(response)=>{
      localStorage.setItem('cartCount',JSON.stringify(response?.count))
      // console.log(response,'response')
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },

    // Always refetch to stay in sync with DB
    onSettled: (data) => {
      console.log(data,'fr')
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}



export function useUpdateCartItemImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, imageId }: { cartItemId: number; imageId: number }) =>
      cartService.updateCartItemImage(cartItemId, imageId),
    // Roll back if backend fails
    onError: (_err) => {
      return _err
      // toast.error("Failed to update quantity");
    },
   
  });
}
