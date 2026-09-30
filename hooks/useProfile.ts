
import { profileService } from "@/services/profileService";
import { useQuery } from "@tanstack/react-query";

export const profileKeys = {
  all: ["get-profile"] as const,
//   featuredProducts: ["featured-products"] as const,
//   newProducts: ["new-products"] as const,
//   bestSellers: ["best-seller-products"] as const,
  // headerCategory:['header-category'] as const,
  // singleCategoryKey: (slug: string) => ["category", slug] as const,
}

export const useUserProfile = ()=> {
    return useQuery({
    queryKey: profileKeys.all,
    queryFn:profileService.getUserProfileDetails,
});
}
