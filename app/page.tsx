"use client";
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


import  { useState } from "react";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useCategory, useHomeCategory } from "@/hooks/useCategories";
import { useBestSellerProducts, useNewProducts } from "@/hooks/useProduct";
import ProductCard from "@/components/product/ProductCard";
import ProductCardLoader from "@/components/product/ProductCardLoader";



interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
}

interface Product {
  id: string;
  badge?: string;
  name: string;
  size: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  verified: boolean;
  avatar: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Skincare",
    count: "120+ Products",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Makeup",
    count: "95+ Products",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Bodycare",
    count: "80+ Products",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Haircare",
    count: "60+ Products",
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Fragrances",
    count: "45+ Products",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Tools & Brushes",
    count: "30+ Products",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop",
  },
];

const newArrivals: Product[] = [
  {
    id: "n1",
    badge: "NEW",
    name: "Radiance Glow Serum",
    size: "30ml",
    price: 16500,
    rating: 5,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "n2",
    badge: "NEW",
    name: "Miss Belleza Eau De Parfum",
    size: "50ml",
    price: 20000,
    rating: 5,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "n3",
    badge: "NEW",
    name: "Hydrating Water Cream",
    size: "50ml",
    price: 13000,
    rating: 5,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "n4",
    badge: "NEW",
    name: "Gentle Face Cleanser",
    size: "120ml",
    price: 9500,
    rating: 5,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "n5",
    badge: "NEW",
    name: "Niacinamide 10% Serum",
    size: "30ml",
    price: 10000,
    rating: 5,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
];

const bestSellers: Product[] = [
  {
    id: "b1",
    badge: "BEST SELLER",
    name: "Glow Face Serum",
    size: "30ml",
    price: 16500,
    rating: 5,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "b2",
    badge: "BEST SELLER",
    name: "Brightening Face Cream",
    size: "50ml",
    price: 12000,
    rating: 5,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1608248597261-833244670d19?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "b3",
    badge: "BEST SELLER",
    name: "Hydrating Toner",
    size: "120ml",
    price: 8500,
    rating: 5,
    reviewsCount: 74,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "b4",
    badge: "BEST SELLER",
    name: "Lip Glow Balm",
    size: "15ml",
    price: 9000,
    rating: 5,
    reviewsCount: 57,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "b5",
    badge: "BEST SELLER",
    name: "Detox Clay Mask",
    size: "100g",
    price: 9000,
    rating: 5,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=300&auto=format&fit=crop",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Belleza products are absolutely amazing! My skin has never looked this good. Highly recommend!",
    author: "Jessica O.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t2",
    quote: "Fast delivery, beautiful packaging and the quality is top notch. I will definitely shop again.",
    author: "Chiamaka A.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t3",
    quote: "I love how gentle and effective the products are. Perfect for my sensitive skin.",
    author: "Aisha M.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
];

interface HeroSlide {
  title: string;
  description: string;
  image: string;
}

interface HeroSlide {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Your New Ritual — LANEIGE",
    description:
      "Laneige's answer to oily skin — Balance Mode is your gentle and effective three-step ritual that keeps excess shine in check while maintaining essential hydration.",
    image: "/images/hero/laneige-balance-mode.jpg",
    buttonText: "Shop Now",
    link: "/brands/laneige",
  },
  {
    title: "Glow Starts Here",
    description:
      "Discover our best-selling vitamin C serums and brightening treatments for radiant, even-toned skin.",
    image: "/images/hero/glow-serum.jpg",
    buttonText: "Shop Serums",
    link: "/category/serums",
  },
  {
    title: "Korean Skincare Edit",
    description:
      "Explore the K-beauty essentials everyone's talking about — from glass-skin glow to gentle daily hydration.",
    image: "/images/hero/korean-skincare.jpg",
    buttonText: "Shop Korean Skincare",
    link: "/category/korean-skincare",
  },
  {
    title: "Fragrance Favourites",
    description:
      "Signature scents for every mood. Shop the season's most-loved perfumes and discovery sets.",
    image: "/images/hero/fragrance-edit.jpg",
    buttonText: "Shop Fragrance",
    link: "/category/fragrance",
  },
  {
    title: "New & Trending",
    description:
      "The latest launches and cult-favourite drops, curated just for you — updated weekly.",
    image: "/images/hero/new-trending.jpg",
    buttonText: "Shop New In",
    link: "/new-arrivals",
  },
];


export default function HomePage() {
  const [email, setEmail] = useState("");
  const {data,isLoading} = useHomeCategory()
  const {data:newProductData,isLoading:newLoading} = useNewProducts()
  const {data:best_sellers,isLoading:bestSellerLoading} = useBestSellerProducts('five',1)

    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const bestSellers = best_sellers?.best_sellers
  console.log(bestSellers)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };
    // <section >
          
    //       {/* Arrow Left */}
    //       <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-600 hover:bg-white shadow-xs z-10">
    //         <ChevronLeft className="w-5 h-5" />
    //       </button>

    //       {/* Arrow Right */}
    //       <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-600 hover:bg-white shadow-xs z-10">
    //         <ChevronRight className="w-5 h-5" />
    //       </button>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl mx-auto">
            
    //         {/* Left Hero Text Content */}
    //         <div className="space-y-4">
    //           <span className="text-pink-500 text-xs font-bold tracking-wide uppercase">
    //             Glow. Nourish. Radiate.
    //           </span>
    //           <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
    //             Beauty that brings out you.
    //           </h1>
    //           <p className="text-sm text-gray-500 max-w-md">
    //             Premium skincare and beauty essentials for healthy, glowing skin every day.
    //           </p>
    //           <div>
    //             <button className="px-6 py-3 bg-pink-500 text-white text-xs font-bold rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2 shadow-sm">
    //               <span>Shop Now</span>
    //               <ArrowRight className="w-4 h-4" />
    //             </button>
    //           </div>
    //         </div>

    //         {/* Right Hero Images */}
    //         <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
    //           <div className="relative w-full h-full max-w-md">
    //             <Image
    //               src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
    //               alt="Belleza Beauty Collection"
    //               fill
    //               className="object-contain"
    //               priority
    //             />
    //           </div>
    //         </div>

    //       </div>

    //       {/* Carousel Pagination Dots */}
    //       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
    //         <span className="w-2 h-2 rounded-full bg-pink-500"></span>
    //         <span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>
    //         <span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>
    //         <span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>
    //         <span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>
    //       </div>

    //     </section>



  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
   

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* Hero Section Banner */}
        <section className="text-center md:text-left">
           <Carousel
           
            plugins={[plugin.current]}
      className="relative rounded-3xl bg-pink-100 overflow-hidden pt-8 md:p-8 lg:p-12 min-h-[380px] flex items-center" 
      >
      <CarouselContent>
        {heroSlides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-none ring-0 bg-pink-100 shadow-none ">
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl mx-auto">
                  
            {/* Left Hero Text Content */}
            <div className="md:space-y-4 row-2 md:row-1">
              <span className="text-pink-500 text-xs font-bold tracking-wide uppercase">
                Glow. Nourish. Radiate.
              </span>
              <h1 className="text-2xl md:text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm mt-2 md:mt-0 text-gray-500 md:max-w-md">
                {slide.description}
              </p>
              <div>
                <button className="px-6 py-3 mx-auto md:ml-0 mt-4 md:mt-0 bg-pink-500 text-white text-xs font-bold rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2 shadow-sm">
                <Link href={slide.link} className="flex items-center gap-2">
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4" /></Link>
                </button>
              </div>
            </div>

            {/* Right Hero Images */}
            <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
              <div className="relative w-full h-full max-w-md">
                <Image
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
                  alt="Belleza Beauty Collection"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
            </div>

                   <div className=" flex items-center w-max translate-x-[230px] md:translate-x-[450px] gap-1.5 ">
                    {
                      heroSlides.map((_, dotIndex) => (
                        <span
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full ${dotIndex === index ? 'bg-pink-500' : 'bg-pink-200'}`}
                        ></span>
                      ))
                    }
                  
                </div>

                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" bg-white text-gray-600 absolute top-16 md:top-4 left-4 z-20"/>
      <CarouselNext className="bg-white text-gray-600 absolute top-16 md:top-4 right-4 z-20"/>
    </Carousel>
        
        </section>

       

        {/* Brand Value Propositions Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-pink-100 rounded-2xl p-6 border border-pink-100/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100/80 flex items-center justify-center text-pink-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Free Delivery</h4>
              <p className="text-[11px] text-gray-400">On orders over ₦30,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100/80 flex items-center justify-center text-pink-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">100% Authentic</h4>
              <p className="text-[11px] text-gray-400">Original & quality assured</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100/80 flex items-center justify-center text-pink-500 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Easy Returns</h4>
              <p className="text-[11px] text-gray-400">7 days return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100/80 flex items-center justify-center text-pink-500 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Customer Support</h4>
              <p className="text-[11px] text-gray-400">+234 800 123 4567</p>
            </div>
          </div>
        </section>

        {/* Shop By Categories Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Shop by Categories</h2>
            <a href="#" className="text-xs font-bold text-pink-500 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
           {
            isLoading ?  <ProductCardLoader/>:
            <>
                 {data?.categories.map((cat) => {
                   console.log(cat.image_url)

                   return  (
                  <div
                    key={cat.id}
                    className=" rounded-2xl p-4 text-center  shadow-md border-gray-100 hover:shadow-lg hover:border-pink-200 transition-all cursor-pointer group"
                  >
                   <Link href={`/category/${cat.id}`}>
                         <div className="relative w-20 h-20 mx-auto mb-3 rounded-xl overflow-hidden bg-pink-100/50">
                      {
                        cat.image_url ? (
                          <img
                            src={cat.image_url}
                            alt={cat.name}
                            className="object-cosver group-hover:scale-105 transition-transform duration-300"
                          />
                          // <Image
                          //   src={cat.image_url}
                          //   alt={cat.name}
                          //   fill
                          //   className="object-cover group-hover:scale-105 transition-transform duration-300"
                          // />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200">
                            <span className="text-gray-400 text-sm">No Image</span>
                          </div>
                        )
                      }
                      {/* <Image
                        src={cat.image_url}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      /> */}
                    </div>
                    <h3 className="text-xs font-bold text-gray-900">{cat.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">{cat.products_count}</p>
                   </Link>
                  </div>
                )
                 }
                 
          )
            
            }
            </>
           }
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
            <a href="#" className="text-xs font-bold text-pink-500 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

           {
              isLoading ? <ProductCardLoader/>:

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {newProductData?.new_products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
}
        </section>

        {/* Best Sellers Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Best Sellers</h2>
            <a href="#" className="text-xs font-bold text-pink-500 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

            {
              bestSellerLoading ? <ProductCardLoader/>:
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {bestSellers.map((product) => (
              <ProductCard product={product}/>
            ))}
            </div>
            }
          
        </section>

        {/* Testimonials / Customer Reviews Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">What Our Customers Say</h2>
            <a href="#" className="text-xs font-bold text-pink-500 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-pink-50 rounded-2xl p-6 border border-pink-100/60 space-y-4 relative"
              >
                <div className="text-pink-500 text-2xl font-serif leading-none">“</div>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-pink-100">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{t.author}</h4>
                    {t.verified && (
                      <span className="text-[10px] text-gray-400">Verified Buyer</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-200"></span>
          </div>
        </section>

        {/* Newsletter Subscription Banner */}
        <section className="bg-pink-100 rounded-3xl p-8 sm:p-12 border border-pink-100/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Newsletter Promotional Product Graphic */}
            <div className="lg:col-span-5 relative h-48 sm:h-56 w-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop"
                  alt="Belleza Newsletter Offer"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Newsletter Form Content */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-xs text-gray-500">
                Get updates on new arrivals, exclusive offers and beauty tips.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-pink-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-pink-500 text-white text-xs font-bold rounded-xl hover:bg-pink-600 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

       

    </div>
  );
}





// "use client";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { products, categories, testimonials } from "@/lib/data";
// import ProductCard from "@/components/product/ProductCard";
// import StarRating from "@/components/StarRating";
// import { useStore } from "@/store/useStore";
// import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield, Truck, RotateCcw } from "lucide-react";
// import { useHeaderCategory } from "@/hooks/useCategories";
// import { HeaderCategory } from "@/components/HeaderCategories";
// import { useBestSellerProducts, useFeaturedProducts, useNewProducts } from "@/hooks/useProduct";
// import Image from "next/image";
// // import FeaturedProducts from "@/components/product/ProductCard";


// const heroProducts = products.filter((p) => p.isFeatured).slice(0, 4);

// export default function HomePage() {
//   const [heroIdx, setHeroIdx] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const addToCart = useStore((s) => s.addToCart);
  
  // const {data,isLoading} = useHeaderCategory()
//   const {data:featuredProducts,isLoading:loadingFeature} = useFeaturedProducts()
//   const {data:newProducts,isLoading:loadingNew} = useNewProducts('all',1,'')
//   const {data:bestSellerProducts,isLoading:loadingBestSeller} = useBestSellerProducts('all',1,'')
//   console.log(newProducts,'newProducts')
//   console.log(bestSellerProducts,'bes')
//   const goTo = (idx: number) => {
//     setIsTransitioning(true);
//     setTimeout(() => { setHeroIdx(idx); setIsTransitioning(false); }, 300);
//   };

//   useEffect(() => {
//     const iv = setInterval(() => {
//       setIsTransitioning(true);
//       setTimeout(() => { setHeroIdx((i) => (i + 1) % heroProducts.length); setIsTransitioning(false); }, 300);
//     }, 4000);
//     return () => clearInterval(iv);
//   }, []);

//   const current = heroProducts[heroIdx];
//   // const newProducts = products.filter((p) => p.isNew);
//   const featured = products.filter((p) => p.isFeatured);
//   const bestSellers = products.filter((p) => p.isBestSeller);


//   const categories = [
//   {
//     name: "Skin Care",
//     image: "/skin-care.png",
//   },
//   {
//     name: "Body Care",
//     image: "/body-care.png",
//   },
//   {
//     name: "Perfumes",
//     image: "/perfumes.png",
//   },
//   {
//     name: "Makeup",
//     image: "/makeup.png",
//   },
//   {
//     name: "Hair Care",
//     image: "/hair-care.png",
//   },
//   {
//     name: "Bath & Shower",
//     image: "/bath-and-shower.png",
//   },
//   {
//     name: "Gift Sets",
//     image: "/gift-sets.png",
//   },
//   {
//     name: "Offers",
//     image: "/offers.png",
//   },
// ];


//   return (
//     <main>
    
  
// {/* here */}
   

//     <section className="container pt-16">
//   <div className="flex  min-h-[500px] overflow-hidden rounded-xl  bg-[#f8c9cc]">
    
//      {/* Hero Content */}
//     <div className="relative z-10 p-5 flex min-h-[500px] flex-[0.5] items-center">
//       <div className=" px-6 md:px-0">
        
//         <span className="inline-flex rounded-full bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#d6336c]">
//           New Collection
//         </span>

//         <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#3d2424] md:text-6xl lg:text-7xl">
//           Glow Up
//           <br />
//           Naturally
//           <span className="ml-3 text-[#e9a21b]">✦</span>
//         </h1>

//         <p className="mt-6 max-w-md text-lg leading-relaxed text-[#4d4d4d] md:text-xl">
//           Premium skincare and beauty products for a more confident you.
//         </p>

//         <button className="mt-8 rounded-xl bg-[#e63970] px-8 py-4 font-semibold text-white transition hover:bg-[#c92d5f]">
//           Shop Now →
//         </button>

//       </div>
//     </div>

//     <div className=" flex-[0.5]">
//       <img
//         src="/hero-image.png"
//         alt="Belleza beauty and skincare products"
//         className="h-full w-full "
//       />
//     </div>

//     {/* Gradient overlay to blend image with background */}
//     {/* <div className="bg-grandient-to-r from-[#f8c9cc] via-[#f8c9cc]/70 to-transparent" /> */}

   
//   </div>
//       {/* TRUST BADGES */}
//       {/* <section className="container px-6 md:px-0 bg-white border-y border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[{icon: Truck, label: "Fast Delivery", sub: "Orders over $50"},{icon: Shield, label: "Authentic Products", sub: "100% genuine"},{icon: RotateCcw, label: "Easy Returns", sub: "30-day policy"},{icon: Sparkles, label: "Expert Curation", sub: "Dermatologist tested"}].map(({icon:Icon,label,sub})=>(
//             <div key={label} className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-[#f8c9cc] rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-[#e63970]" /></div>
//               <div><p className="text-sm font-semibold text-gray-900">{label}</p><p className="text-xs text-gray-400">{sub}</p></div>
//             </div>
//           ))}
//         </div>
//       </section> */}
//   {/* <section className="px-4 py-10 md:px-8 lg:px-12"> */}
// </section>
//   <section className="container px-6 md:px-0 py-10">
//       <div className="mx-auto max-w-7xsl">
//         <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8 ">
//           {categories.map((category) => (
//             <button
//               key={category.name}
//               className="group flex flex-col items-center"
//             >
//               {/* Category Image */}
//               <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full
//                transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg md:h-20 md:w-20">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               {/* Category Name */}
//               <h3 className="mt-4 text-center text-sm font-medium text-gray-700 transition group-hover:text-pink-600 md:text-base">
//                 {category.name}
//               </h3>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* <FeaturedProducts/> */}
//       </section>
 

//       {/* end */}

  

//       {/* SHOP BY CATEGORY */}
//       <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-end justify-between mb-8">
//           <div><p className="text-teal text-sm font-medium mb-1">Explore</p><h2 className="font-display text-3xl font-bold text-gray-900">Shop by Category</h2></div>
//           <Link href="/category/all" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">All Categories <ArrowRight size={14} /></Link>
//         </div>


//         {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//          {
//           isLoading ? 'Loading':
//           <>
//              {data?.map((category:HeaderCategory) => (
//             <Link key={category.id} href={`/category/${category.id}`} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
//               <div className="aspect-square overflow-hidden"><img src={category.image_url} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
//               <div className="p-3"><p className="text-sm font-semibold text-gray-900">{category.name}</p><p className="text-xs text-gray-400">{category.products_count} products</p></div>
//             </Link>
//           ))}
//           </>
//          }
//         </div> */}
//         {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {categories.map((cat) => (
//             <Link key={cat.id} href={`/category/${cat.id}`} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
//               <div className="aspect-square overflow-hidden"><img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
//               <div className="p-3"><p className="text-sm font-semibold text-gray-900">{cat.name}</p><p className="text-xs text-gray-400">{cat.productCount} products</p></div>
//             </Link>
//           ))}
//         </div> */}
//       </section>

//       {/* FEATURED PRODUCTS */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-end justify-between mb-8">
//             <div><p className="text-teal text-sm font-medium mb-1">Handpicked</p><h2 className="font-display text-3xl font-bold text-gray-900">Featured Products</h2></div>
//             <Link href="/category/all" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight size={14} /></Link>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//            {
//             loadingFeature ? 'Loading...':
//             <>
//                  {
//               featuredProducts?.featured_products?.data?.map((product) => <ProductCard key={product.id} product={product} />)
//             }
//             </>
//            }
//           </div>
//         </div>
//       </section>

//       {/* NEW ARRIVALS */}
//       <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-end justify-between mb-8">
//           <div><p className="text-teal text-sm font-medium mb-1">Just Dropped</p><h2 className="font-display text-3xl font-bold text-gray-900">New Arrivals</h2></div>
//           <Link href="/category/new" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">See All <ArrowRight size={14} /></Link>
//         </div>
//         {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{newProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div> */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {
//             isLoading ? 'Loading...':
//             <>
//           {newProducts?.new_products?.data?.map((product) => <ProductCard key={product.id} product={product} />)}

//             </>
//           }
//           </div>
//       </section>

//       {/* PROMO BANNER */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden relative p-10 md:p-16">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal rounded-full translate-y-1/2 -translate-x-1/2" />
//           </div>
//           <div className="relative z-10 text-center max-w-2xl mx-auto">
//             <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">Limited Time</span>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Get 20% Off Your First Order</h2>
//             <p className="text-gray-300 mb-8">Use code <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">WELCOME20</span> at checkout</p>
//             <Link href="/category/all" className="inline-block bg-white text-gray-900 px-10 py-3 rounded-xl font-semibold hover:bg-offwhite transition-colors">Shop Now</Link>
//           </div>
//         </div>
//       </section>

//       {/* BEST SELLERS */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-end justify-between mb-8">
//             <div><p className="text-teal text-sm font-medium mb-1">Most Loved</p><h2 className="font-display text-3xl font-bold text-gray-900">Best Sellers</h2></div>
//             <Link href="/category/bestseller" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight size={14} /></Link>
//           </div>
//           {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {
//               loadingBestSeller ? 'Loading...':
//               <>
//                 {bestSellerProducts?.best_sellers.map((product) => <ProductCard key={product.id} product={product} />)}
              
//               </>
//             }
//             </div> */}
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="text-center mb-10">
//           <p className="text-teal text-sm font-medium mb-1">Social Proof</p>
//           <h2 className="font-display text-3xl font-bold text-gray-900">What Our Customers Say</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//           {testimonials.map((t) => (
//             <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
//               <StarRating value={t.rating} size={16} readonly />
//               <p className="text-sm text-gray-600 mt-3 mb-5 leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
//               <div className="flex items-center gap-3">
//                 <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
//                 <div><p className="text-sm font-semibold text-gray-900">{t.name}</p><p className="text-xs text-gray-400">{t.location}</p></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }



// // here

// // <div className="relative min-h-[500px] overflow-hidden rounded-xl bg-[#f8c9cc]">
    
// //     {/* Left-side pink background */}
// //     <div className="flex" />
// //     {/* <div className="absolute inset-0 bg-[#f8c9cc]" /> */}

// //     {/* Product Image - positioned on the right */}
// //     {/* <div className="absolute inset-y-0 right-0 w-full md:w-[50%]"> */}
// //     <div className="absolute inset-y-0 right-0 w-full md:w-[50%]">
// //       <img
// //         src="/hero-image.png"
// //         alt="Belleza beauty and skincare products"
// //         className="h-full w-full object-cover object-right"
// //       />
// //     </div>

// //     {/* Gradient overlay to blend image with background */}
// //     <div className="absolute inset-0 bg-grandient-to-r from-[#f8c9cc] via-[#f8c9cc]/70 to-transparent" />

// //     {/* Hero Content */}
// //     <div className="relative z-10 flex min-h-[500px] items-center">
// //       <div className=" px-6 md:px-0">
        
// //         <span className="inline-flex rounded-full bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#d6336c]">
// //           New Collection
// //         </span>

// //         <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#3d2424] md:text-6xl lg:text-7xl">
// //           Glow Up
// //           <br />
// //           Naturally
// //           <span className="ml-3 text-[#e9a21b]">✦</span>
// //         </h1>

// //         <p className="mt-6 max-w-md text-lg leading-relaxed text-[#4d4d4d] md:text-xl">
// //           Premium skincare and beauty products for a more confident you.
// //         </p>

// //         <button className="mt-8 rounded-xl bg-[#e63970] px-8 py-4 font-semibold text-white transition hover:bg-[#c92d5f]">
// //           Shop Now →
// //         </button>

// //       </div>
// //     </div>
// //   </div>