// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { userService, User } from "@/services/userService";

import { categoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";


// // Query key factory — avoids magic strings
// export const userKeys = {
//   all: ["users"] as const,
//   detail: (id: number) => ["users", id] as const,
// };

// // Fetch all users
// export function useUsers() {
//   return useQuery({
//     queryKey: userKeys.all,
//     queryFn: userService.getAll,
//   });
// }

// // Fetch a single user
// export function useUser(id: number) {
//   return useQuery({
//     queryKey: userKeys.detail(id),
//     queryFn: () => userService.getById(id),
//     enabled: !!id, // only run when id exists
//   });
// }

// // Create a user + invalidate cache
// export function useCreateUser() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: userService.create,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: userKeys.all });
//     },
//   });
// }

// export function useUsers() {
//   return useQuery({
//     queryKey: userKeys.all,
//     queryFn: userService.getAll,
//   });
// }


export const categoryKeys = {
  all: ["category"] as const,
  headerCategory:['header-category'] as const,
  getHomeCategories:['home-categories'] as const,
  singleCategoryKey: (id: string,page:number,query:string) =>{
    if(query){
      return ["category", id,page,query] as const
    }else{
     return ["category", id,page] as const
    }
  } 
}

export const useCategory = (page:number = 1,id:string,query:string)=> {
    return useQuery({
    queryKey: categoryKeys.singleCategoryKey(id,page,query),
    queryFn: ()=> {
      if(query){
        return categoryService.getSearchProductsInCategory(page,id,query)
      }
      return categoryService.getCategory(id,page)
    },
     enabled: !!id,
});
}

export const useHomeCategory = ()=> {
    return useQuery({
    queryKey: categoryKeys.getHomeCategories,
    queryFn: ()=> {
      return categoryService.getHomeCategories()
    },
});
}
    

export const useHeaderCategory = ()=> {
    return useQuery({
    queryKey: categoryKeys.headerCategory,
    queryFn: categoryService.getHeaderCategories
});
}