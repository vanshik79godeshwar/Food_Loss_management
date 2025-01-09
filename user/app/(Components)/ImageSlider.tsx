'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  'https://media.istockphoto.com/id/1251268131/photo/senior-man-with-bunch-of-freshly-harvested-carrots.jpg?s=612x612&w=0&k=20&c=N-xOciVFINYbPDf0FzV1tjwtfnc7gYEMW2TpW8h3bCg=',
  'https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=U5T70bi24itoTDive1CVonJbJ97ChyL2Pz1I2kOoSRo=',
  'https://media.istockphoto.com/id/1319175748/photo/packaged-nuts.jpg?s=612x612&w=0&k=20&c=Ld1YhPyYR8GwNVHVkkWWAu55CS4Fxb7k5DWrMLYGyTA=',
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className='object-cover w-full h-full'
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}