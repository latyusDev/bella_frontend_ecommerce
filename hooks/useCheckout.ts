import { checkoutService } from "@/services/checkoutService";
import { useQuery } from "@tanstack/react-query";


export const useCheckoutDetails = ()=>{
    return useQuery({
        queryKey: ['checkout-details'],
        queryFn:checkoutService.checkoutDetails,
        staleTime:10*60*1000
    });
}