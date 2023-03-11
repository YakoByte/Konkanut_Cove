import React, { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import { ArrowLeft, ArrowRight, } from "@icon-park/react";
import Image from "next/image";
import Link from "next/link";

const CarouselLarge = ({ data,isLeft=false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);


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
    <div className={"sm:px-4 px-2 overflow-hidden "+(isLeft?"sm:pl-20":"sm:pr-20") }>
      <div className=" h-[300px] w-full relative">
      
        <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
          {data.map((slide, index) => {
            return (
              <Image
                    src={slide.image}
                    fill
                    alt="This is a carousel slide"
                    key={index}
                    className={
                      index === currentSlide
                        ? "rounded-md block w-full h-auto object-cover"
                        : "hidden"
                    }
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
        <div className={"absolute h-full z-50 "+(isLeft?"sm:left-[-20px] left-[-10px]":"sm:right-[-20px] right-[-10px]")}>
            <div className={"flex items-end sm:items-center h-full "+(isLeft?"justify-start":"justify-end")}>
                <Link href="/" className=" p-2 sm:p-5 rounded-md sm:rounded-full bg-blue-500">
                    {isLeft?
                        <ArrowLeft size="30" fill="white"/>:
                        <ArrowRight size="30" fill="white"/>
                    }
                </Link>
            </div>
        </div>

        <div className={"absolute w-full sm:max-w-[60%] sm:bottom-[15%] z-0 "+(isLeft?"sm:left-[30%]":"sm:left-[10%]")}>
          <div className="flex flex-col max-sm:p-3 px-5">
             <div className="text-4xl font-bold text-white mb-5 ">{data[currentSlide].title}</div>
             <div className={"text-sm text-white mb-4 break-all max-xs:grow"+(isLeft?"sm:max-w-[70%]":"sm:max-w-[70%]")}>{data[currentSlide].desc}</div>
              <div className="flex w-min">
                  {data.map((element, index) => {
                    return (
                      <div
                        className={
                          index === currentSlide
                            ? "h-5 w-5 bg-gray-500 rounded-full mx-2 mb-2 cursor-pointer"
                            : "h-5 w-5 bg-gray-400 rounded-full mx-2 mb-2 cursor-pointer"
                        }
                        key={index}
                        onClick={() => {
                          setCurrentSlide(index);
                        }}
                      ></div>
                    );
                  })}
              </div >
          </div >
        </div>
        
      </div>
    </div>
  );
};

export default CarouselLarge;
