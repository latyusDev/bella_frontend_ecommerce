import React from 'react'
import logo from "@/public/bella_logo.png";
import footer_logo from "@/public/bella_footer_logo.png";
import Image from 'next/image';
import Link from 'next/link';
type isFooter = {
  isFooter:boolean
}

const Logo = ({isFooter}:isFooter) => {
  return (
    <div className="flex items-center gap-2 w-[200px]">
        <Link href="/">
         {
           isFooter ?
           <Image src={footer_logo} alt="Bella Logo" width={200} height={200} />:
         <Image src={logo} alt="Bella Logo" width={200} height={200} />

         }
         </Link>
    </div>
  )
}

export default Logo