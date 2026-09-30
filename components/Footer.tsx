"use client"
import Link from "next/link";
import { categories } from "@/lib/data";
import { Phone, Mail } from "lucide-react";
import Logo from "./global/Logo";

export default function Footer() {
  return (
     <footer className="bg-pink-500 border-t border-gray-100 mt-16 pt-12 pb-8 text-xs text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand Summary */}
            <div className="lg:col-span-2 space-y-3">
             <Logo isFooter={true} />
              <p className="text-white max-w-sm leading-relaxed">
                Premium beauty and skincare products for every skin type. Glow with confidence every day.
              </p>
            
            </div>

            {/* Shop Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-white">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-500">All Products</a></li>
                <li><a href="#" className="hover:text-pink-500">Skincare</a></li>
                <li><a href="#" className="hover:text-pink-500">Makeup</a></li>
                <li><a href="#" className="hover:text-pink-500">Bodycare</a></li>
                <li><a href="#" className="hover:text-pink-500">Haircare</a></li>
                <li><a href="#" className="hover:text-pink-500">Fragrances</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="space-y-3">
              <h4 className="font-bold text-white">Customer Care</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-pink-500">FAQs</a></li>
                <li><a href="#" className="hover:text-pink-500">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-pink-500">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-pink-500">Track Order</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-white">Contact Us</h4>
              <ul className="space-y-2 text-white">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>+234 800 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-white" />
                  <span>hello@bellezacosmetics.com</span>
                </li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Payment Methods */}
          <div className="border-t border-gray-200/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white">
            <p>© 2026 Belladama Cosmetics. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded font-bold text-blue-600">VISA</span>
              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded font-bold text-red-500">MC</span>
              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded font-bold text-teal-600">VERVE</span>
              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded font-bold text-blue-500">AMEX</span>
            </div>
          </div>

        </div>
      </footer>
  );
}
