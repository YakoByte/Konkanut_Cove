import { useMediaQuery } from "../hooks/media-query";
import clsx from "clsx";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import { Size } from "../constants/size";

const Carousel2 = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const isXS = useMediaQuery(0,Size.xs)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!paused) {
        let newSlide =
          currentSlide === data.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentSlide, paused, data]);

  const nextSlide = () => {
    let newSlide = currentSlide === data.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const prevSlide = () => {
    let newSlide =
      currentSlide === 0 ? data.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="max-w-lg w-full relative" >
      
        <div className="max-w-lg w-full h-72 max-xs:h-64 flex overflow-hidden">
            <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
              {data.map((slide, index) => {
                return (
                  <Image
                    src={slide.image}
                    alt="This is a carousel slide"
                    key={index}
                    className={clsx(
                      index === currentSlide
                        ? "rounded-md block w-full h-auto object-cover"
                        : "hidden",
                        "object-fit"
                    )}
                    height="288"
                    width="288"
                    onMouseEnter={() => {
                      setPaused(true);
                    }}
                    onMouseLeave={() => {
                      setPaused(false);
                    }}
                  />
                );
              })}
            </Swipe>
        </div>

        <div className="absolute w-full items-center flex justify-between xs:bottom-[-30%] bottom-[0%]">
          {data.map((element, index) => {
            return (
              <div
                className={clsx(
                  index === currentSlide
                    ? "border-blue-700 border-4 mb-3 cursor-pointer w-[80px] h-[60px] xs:w-[80px] xs:h-[60px] relative rounded-sm overflow-hidden"
                    : "border-none mb-3 cursor-pointer w-[80px] h-[60px] xs:w-[80px] xs:h-[60px] relative rounded-md overflow-hidden",
                    "object-fit"
                )}
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              >
                <Image src={element.image} fill alt=""/>
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
};

export default Carousel2;
