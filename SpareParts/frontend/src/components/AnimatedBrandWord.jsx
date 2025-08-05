import React, { useEffect, useState } from 'react';

const brands = [
  'Range Rover', 'BMW', 'Mercedes-Benz', 'Audi', 'Volvo',
  'Volkswagen', 'Porsche', 'MG', 'Ford', 'Jaguar',
  'Renault', 'Peugeot', 'Mini Cooper'
];

const AnimatedBrandWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % brands.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

 return (
  <span className="inline-flex items-center align-middle">
    <div className="h-[1.5rem] w-[10rem] overflow-hidden relative">
      <div
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${index * 1.5}rem)` }}
      >
        {brands.map((brand, i) => (
          <div key={i} className="h-[1.5rem] text-yellow-400 font-semibold">
            {brand}
          </div>
        ))}
      </div>
    </div>
  </span>
);

};

export default AnimatedBrandWord;
