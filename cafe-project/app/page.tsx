"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === featuredItems.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === featuredItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? featuredItems.length - 1 : prev - 1
    );
  };

  // Placeholder data - this can be replaced with MongoDB data later
  const featuredItems = [
    { id: 1, name: "Signature Latte", price: 4.99, image: "/placeholder1.jpg" },
    { id: 2, name: "Artisan Croissant", price: 3.99, image: "/placeholder2.jpg" },
    { id: 3, name: "Iced Mocha", price: 5.99, image: "/placeholder3.jpg" },
  ];

  const newItems = [
    { id: 4, name: "Matcha Green Tea", price: 4.99, image: "/placeholder4.jpg" },
    { id: 5, name: "Blueberry Muffin", price: 3.49, image: "/placeholder5.jpg" },
  ];

  return (
    <main className="container mx-auto px-4">
      {/* Hero Section with Carousel */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-lg">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
          >
            →
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Menu Items */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newItems.map((item) => (
            <div key={item.id} className="rounded-lg shadow-lg p-4">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <p className="text-lg font-bold">${item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
