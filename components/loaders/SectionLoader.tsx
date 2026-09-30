import React from 'react'

const SectionLoader = ({h=50}:{h?: number}) => {
  return (
    <div className={`h-[${h}px] w-full  rounded-sm bg-pink-400 animate-pulse`} />
  )
}

export default SectionLoader