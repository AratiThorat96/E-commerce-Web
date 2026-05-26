import React from 'react';
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.png";
import back4 from "../assets/back4.png";

const backgrounds = [back4, back2, back1, back3];

function Background({ heroCount }) {
  return (
    <div className="w-full h-1/2 md:w-1/2 md:h-full relative overflow-hidden">
      {backgrounds.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`background-${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            heroCount === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

export default Background;
