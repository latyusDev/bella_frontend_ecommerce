import { useHeaderCategory } from '@/hooks/useCategories';
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react';

export type HeaderCategory = {
  name:string;
  image_url:string;
  id:number;
  products_count:number;
  desription:string;
  created_at:string;
  updated_at:string;
}

type HeaderCategoriesProps = {
  setCategoriesOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderCategories = ({ setCategoriesOpen }: HeaderCategoriesProps) => {

    const {data,isLoading} = useHeaderCategory()

  return (
          <div className="dropdown-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3 animate-scale-in">
                        
                        {
                          isLoading ? <p>Loading...</p>:

                         <>
                             {data?.map((category:HeaderCategory) => (
                            <Link
                              key={category.id}
                              href={`/category/${category.id}`}
                              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-mint transition-colors group"
                              onClick={() => setCategoriesOpen(false)}
                            >
                              <span className="text-sm font-medium text-gray-800 group-hover:text-teal">
                                {category.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {category.products_count} 
                              </span>
                            </Link>
                          ))}
                         </>
                        }
                        
                        </div>
  )
}

export default HeaderCategories